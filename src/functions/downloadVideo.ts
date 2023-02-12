import { Command } from "@tauri-apps/api/shell";
import { join } from "@tauri-apps/api/path";
import { extensionType, qualityType } from "../App";

export async function downloadVideo(
  destination_dir: string,
  url: string,
  quality: qualityType,
  extension: extensionType
): Promise<Command> {
  const destination_path = await join(destination_dir, "%(title)s.%(ext)s");
  const args = {
    High: {
      mp4: [
        "-f",
        "bv[ext=webm]+ba[ext=webm]",
        "--merge-output-format",
        "webm",
        "--record-video",
        "mp4",
        url,
        "-o",
        destination_path,
      ],
      mp3: [
        "-x",
        "-f",
        "ba[ext=webm]",
        "--audio-format",
        "mp3",
        url,
        "-o",
        destination_path,
      ],
      m4a: [
        "-x",
        "-f",
        "ba[ext=webm]",
        "--audio-format",
        "m4a",
        url,
        "-o",
        destination_path,
      ],
    },
    Standard: {
      mp4: [
        "-f",
        "bv[ext=mp4]+ba[ext=m4a]",
        "--merge-output-format",
        "mp4",
        url,
        "-o",
        destination_path,
      ],
      mp3: [
        "-x",
        "-f",
        "ba[ext=webm]",
        "--audio-format",
        "mp3",
        url,
        "-o",
        destination_path,
      ],
      m4a: ["-f", "ba[ext=m4a]", url, "-o", destination_path],
    },
  };

  console.log(`Executed cmd: yt-dlp ${args[quality][extension].join(" ")}`);
  return new Command("yt-dlp", args[quality][extension]);
}
