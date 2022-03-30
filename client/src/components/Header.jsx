import { ActionIcon, Group, Header as MantineHeader } from "@mantine/core";
import { Bell } from "tabler-icons-react";
import { Logo } from "./index";

const Header = ({ height = 70 }) => {
  return (
    <MantineHeader height={height} style={{ padding: "0px 5px" }}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <Logo />
        <ActionIcon variant="default" size={32}>
          <Bell size={24} />
        </ActionIcon>
      </Group>
    </MantineHeader>
  );
};

export default Header;
