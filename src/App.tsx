import "./App.css";
import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { open } from "@tauri-apps/api/dialog";
import { getVideoMetaData } from "./functions/getVideoMetadata";
import { downloadVideo } from "./functions/downloadVideo";
import { DownloadOptionSelect } from "./components/DownloadOptionSelect";
import { Queue } from "./components/Queue";

export type qualityType = "High" | "Standard";
export type extensionType = "mp4" | "mp3" | "m4a";
export type queueType = {
  title: string;
  url: string;
  imageUrl: string;
  status: string;
};
export type queuesType = {
  [key: string]: queueType;
};

function App() {
  const toast = useToast();
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState<qualityType>("Standard");
  const [extension, setExtension] = useState<extensionType>("mp4");
  const [queues, setQueues] = useState<queuesType>({});
  let queueKeys: string[] = [];

  async function handleDownloadClick() {
    console.log("Download button clicked.");
    console.log("URL: " + url);
    console.log("Quality: " + quality);
    console.log("Extension: " + extension);
    setUrl("");

    // * Get destination directory to save youtube video or music
    let destination_dir = await open({
      directory: true,
      title: "Select a directory to save the file",
      multiple: false,
    });
    console.log(destination_dir);
    if (Array.isArray(destination_dir) || destination_dir == null) {
      toast({
        title: "Error",
        description:
          "Please select a valid directory to save the video or music.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // * Get metadata of youtube video or music and spawn a queue
    const metadata = await getVideoMetaData(url);
    const queue: queueType = {
      title: metadata.title,
      url: url,
      imageUrl: metadata.thumbnail_url,
      status: "Preparing to download...",
    };
    setQueues((queues) => ({ ...queues, [metadata.title]: queue }));

    // * Get command to download youtube video or music
    const command = await downloadVideo(
      destination_dir,
      url,
      quality,
      extension
    );

    // * Handle command events
    command.once("close", (data) => {
      console.log("Process exited with code: " + data.code);
      toast({
        title: "Download complete",
        description: `"${metadata.title}.${extension}" has been downloaded successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      cleanupQueue(metadata.title);
    });
    command.on("error", (data) => {
      console.log("Process exited with error: " + data.error);
    });
    command.stdout.on("data", (data) => {
      const queueKey = metadata.title;
      console.log(data);
      setQueues((queues) => {
        if (queues[queueKey] != undefined) {
          queues[queueKey].status = data;
        }
        return queues;
      });
    });
    command.stderr.on("data", (data) => {
      console.error(data);
    });

    // * Spawn command
    const child = await command.spawn();
    console.log(`pid: ${child.pid}`);
  }

  function cleanupQueue(title: string) {
    console.log("Deleting last queue.");
    setQueues((queues) => {
      const { [title]: _, ...newQueues } = queues;
      return newQueues;
    });
  }

  return (
    <>
      <Box h="100%">
        <Grid h="100%" templateRows="50% 50%">
          <GridItem>
            <VStack
              h="100%"
              alignItems="center"
              justifyContent="center"
              spacing={4}
            >
              <Heading as="h1" size="lg">
                Enter URL to download.
              </Heading>
              <HStack w="80%">
                <DownloadOptionSelect
                  extension={extension}
                  setExtension={setExtension}
                  quality={quality}
                  setQuality={setQuality}
                />
                <Input
                  placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </HStack>
              <Button onClick={handleDownloadClick}>Download</Button>
            </VStack>
          </GridItem>
          <GridItem overflow="auto">
            <VStack spacing={5}>
              {Object.keys(queues).map((queue_key, index) => (
                <Queue index={index} queue_key={queue_key} queues={queues} />
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default App;
