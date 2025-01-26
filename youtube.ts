import { spawn } from 'child_process'
import { v4 as uuid } from 'uuid'
import * as os from 'os'
import path from 'path'

interface VideoDetails {
  id: string
  title: string
  thumbnails: any[]
  image: string
  duration: number
  language: string
}

interface CaptionTrack {
  id: string
  url: string
  [key: string]: any
}

interface YoutubeInfo {
  videoDetails: VideoDetails
  captionTracks: CaptionTrack[]
}

async function executeYtDlp(args: string[]): Promise<string> {
  const process = spawn('yt-dlp', args)

  let output = ''
  process.stdout.on('data', (data) => {
    output += data.toString()
  })

  process.stderr.on('data', (data) => {
    console.error(`Error: ${data}`)
  })

  const exitCode = await new Promise<number>((resolve) => {
    process.on('close', resolve)
  })

  if (exitCode === 0) {
    return output
  } else {
    throw new Error(`Failed with exit code: ${exitCode}`)
  }
}

async function getYoutubeInfo(videoId: string): Promise<YoutubeInfo> {
  const args = [
    '--cookies',
    'youtube_cookies.txt',
    '--dump-json',
    `https://www.youtube.com/watch?v=${videoId}`,
  ]

  const output = await executeYtDlp(args)
  const videoInfo = JSON.parse(output)

  const captionTracks = Object.keys(videoInfo?.subtitles || {}).map((langKey) => {
    const captions = videoInfo.subtitles[langKey]
    const srv1Caption = captions?.find((caption: any) =>
      caption.url.includes('fmt=srv1')
    )
    return { ...srv1Caption, id: langKey }
  })

  return {
    videoDetails: {
      id: videoInfo?.id,
      title: videoInfo?.title,
      thumbnails: videoInfo?.thumbnails,
      image: videoInfo?.thumbnail,
      duration: videoInfo?.duration,
      language: videoInfo?.language,
    },
    captionTracks,
  }
}

async function downloadAudioFromYoutube(videoId: string): Promise<string> {
  const url = `https://www.youtube.com/watch?v=${videoId}`
  const outputPath = path.resolve(os.tmpdir(), `${videoId}.mp3`)

  try {
    const args = [
      '--cookies',
      'youtube_cookies.txt',
      '-f',
      'worstaudio',
      '-x',
      '--audio-format',
      'mp3',
      '-o',
      outputPath,
      url,
    ]

    await executeYtDlp(args)
    return outputPath
  } catch (error) {
    console.error(`Error downloading from YouTube: ${error}`)
    throw error
  }
}

export { downloadAudioFromYoutube, getYoutubeInfo }
