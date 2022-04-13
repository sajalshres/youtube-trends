import { useState } from "react";
import {
  Menu,
  UnstyledButton,
  Group,
  ColorSwatch,
  createStyles,
  useMantineTheme,
  Text,
} from "@mantine/core";

const useStyles = createStyles((theme, { opened }) => ({
  control: {
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px 0px",
    borderRadius: theme.radius.sm,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: "background-color 150ms ease",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },
}));

const ColorMenu = ({ color, setColor, colors }) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  const menuItems = Object.keys(colors).map((color) => {
    return (
      <Menu.Item
        icon={<ColorSwatch key={color} color={colors[color][6]} />}
        key={color}
        onClick={() => {
          setColor(colors[color][6]);
        }}
      >
        <Text size="xs" color={color} transform="uppercase">
          {color}
        </Text>
      </Menu.Item>
    );
  });

  return (
    <Menu
      transition="pop"
      transitionDuration={150}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      placement="end"
      size="sm"
      control={
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <ColorSwatch color={color} size={20} />
          </Group>
        </UnstyledButton>
      }
    >
      {menuItems}
    </Menu>
  );
};

export default ColorMenu;
