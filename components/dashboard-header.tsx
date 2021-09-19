import { Avatar } from "@chakra-ui/avatar";
import { useColorMode } from "@chakra-ui/color-mode";
import { ExternalLinkIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/menu";
import { Select } from "@chakra-ui/select";
import { Switch } from "@chakra-ui/switch";
import Cookies from "js-cookie";
import _ from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { k } from "../lib/constants";
import { ClockifyUser } from "../lib/models/clockify-user";
import { ClockifyWorkspace } from "../lib/models/clockify-workspace";

type Props = {
  loading: boolean;
  workspaces: ClockifyWorkspace[];
  user: ClockifyUser;
  onWorkspaceChange: React.Dispatch<React.SetStateAction<string | null>>;
};

export const DashboardHeader = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();

  const onLogout = () => {
    Cookies.remove(k.API_KEY_KEY);
    Cookies.remove(k.HOURLY_RATE_KEY);
    router.replace("/login");
  };

  return (
    <Flex alignItems="center">
      <Box>
        <Select
          disabled={props.loading}
          defaultValue={props.user.defaultWorkspace || ""}
          onChange={(e) => props.onWorkspaceChange(e.target.value)}
        >
          {props.workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </Select>
      </Box>
      <Spacer />
      <Box>
        <HStack spacing="4">
          <Text>Hi, {props.user.name.split(" ")[0]}!</Text>
          <Menu placement="bottom-end" closeOnSelect={false}>
            <MenuButton as={Avatar} cursor="pointer" name={props.user.name} src={props.user.profilePicture} />
            <MenuList>
              <MenuGroup title="Color mode">
                <MenuItem>
                  <Switch mr="3" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
                  <span>{_.startCase(colorMode)} mode</span>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} onClick={onLogout}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
    </Flex>
  );
};
