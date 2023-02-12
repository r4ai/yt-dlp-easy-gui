export type YouTubeMetadata = {
  title: string;
  url: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  html: string;
};

export async function getVideoMetaData(url: string): Promise<YouTubeMetadata> {
  const response = await fetch("https://www.youtube.com/oembed?url=" + url);
  const metadata_raw = await response.json();
  const metadata = { ...metadata_raw, url };
  console.log(metadata);
  return metadata;
}
