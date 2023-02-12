import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { FiChevronDown, FiFilm, FiMusic } from "react-icons/fi";
import { extensionType, qualityType } from "../App";

export interface DownloadOptionSelectProps {
  extension: extensionType;
  setExtension: (extension: extensionType) => void;
  quality: qualityType;
  setQuality: (quality: qualityType) => void;
}

export const DownloadOptionSelect: FC<DownloadOptionSelectProps> = ({
  extension,
  setExtension,
  quality,
  setQuality,
}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FiChevronDown />} w="100px">
        {extension}
      </MenuButton>
      <MenuList>
        <MenuOptionGroup title="Quality" defaultValue="Standard">
          <MenuItemOption value="High" onClick={() => setQuality("High")}>
            High
          </MenuItemOption>
          <MenuItemOption
            value="Standard"
            onClick={() => setQuality("Standard")}
          >
            Standard
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup title="Extension" defaultValue="mp4">
          <MenuItemOption value="mp4" onClick={() => setExtension("mp4")}>
            <HStack>
              <Text>mp4</Text>
              <Spacer />
              <FiFilm />
            </HStack>
          </MenuItemOption>
          <MenuItemOption value="mp3" onClick={() => setExtension("mp3")}>
            <HStack>
              <Text>mp3</Text>
              <Spacer />
              <FiMusic />
            </HStack>
          </MenuItemOption>
          <MenuItemOption value="m4a" onClick={() => setExtension("m4a")}>
            <HStack>
              <Text>m4a</Text>
              <Spacer />
              <FiMusic />
            </HStack>
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
