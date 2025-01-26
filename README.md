# YouTube Audio Downloader

## Prerequisites

- Node.js installed
- yt-dlp installed (`pip install yt-dlp`)
- A valid YouTube cookies file (youtube_cookies.txt) in the root directory

## Setup

1. Install dependencies:
   `npm install`

2. Create a youtube_cookies.txt file in the root directory with your YouTube cookies: https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp

## Usage

1. Update the VIDEO_ID_HERE constant in test.ts with your desired YouTube video ID
   (e.g., for https://www.youtube.com/watch?v=dQw4w9WgXcQ, the ID is 'dQw4w9WgXcQ')

2. Run the script:
   `npx ts-node test.ts`
