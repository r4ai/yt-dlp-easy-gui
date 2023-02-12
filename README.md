## Requirements

- ffmpeg
- yt-dlp

## How to build

Install required packages. If you're on Windows, you can use [chocolatey](https://chocolatey.org/). Don't forget to add installed softwares to your PATH.

- windows
  ```bash
  choco install ffmpeg
  choco install yt-dlp
  ```
- macos
  ```bash
  brew install ffmpeg
  brew install yt-dlp
  ```

Build the app.

```bash
npm run tauri build
```
