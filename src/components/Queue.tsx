import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  VStack,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { FC } from "react";
import { queuesType } from "../App";

export interface QueueProps {
  index: number;
  queue_key: string;
  queues: queuesType;
}

export const Queue: FC<QueueProps> = ({ index, queue_key, queues }) => {
  return (
    <Box key={index}>
      <Center>
        <Grid
          w="90%"
          templateColumns="25% 75%"
          bg="blackAlpha.400"
          p={3}
          borderRadius="lg"
        >
          <GridItem h="120px">
            <Image
              src={queues[queue_key].imageUrl}
              alt={queues[queue_key].url}
              h="100%"
            />
          </GridItem>
          <GridItem ml={4} h="120px">
            <VStack h="100%">
              <Heading
                as="h3"
                size="md"
                w="100%"
                css={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {queues[queue_key].title}
              </Heading>
              <Spacer />
              <Text
                w="100%"
                textAlign="left"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {queues[queue_key].status}
              </Text>
            </VStack>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};
