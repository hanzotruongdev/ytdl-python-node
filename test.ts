import { downloadAudioFromYoutube, getYoutubeInfo } from './youtube'

async function main() {
  try {
    const VIDEO_ID_HERE = 'dQw4w9WgXcQ'
    // Test getYoutubeInfo
    const info = await getYoutubeInfo(VIDEO_ID_HERE)
    console.log('Video Info:', info)

    // Test downloadAudioFromYoutube
    const audioPath = await downloadAudioFromYoutube(VIDEO_ID_HERE)
    console.log('Audio downloaded to:', audioPath)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
