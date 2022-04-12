import { ActionIcon, Group, Header as MantineHeader } from "@mantine/core";
import { Bell, Settings } from "tabler-icons-react";
import Logo from "./Logo";

const Header = ({ height = 70, countryMenu }) => {
  return (
    <MantineHeader height={height} style={{ padding: "0px 5px" }}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Logo />
        <Group>
          {countryMenu}
          {/* <ActionIcon variant="default" size={32}>
            <Bell size={24} />
          </ActionIcon>
          <ActionIcon variant="default" size={32}>
            <Settings size={24} />
          </ActionIcon> */}
        </Group>
      </Group>
    </MantineHeader>
  );
};

export default Header;
