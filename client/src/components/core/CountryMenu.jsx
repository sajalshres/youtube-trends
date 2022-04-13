import { useEffect, useState } from "react";
import {
  createStyles,
  UnstyledButton,
  Menu,
  Image,
  Group,
} from "@mantine/core";
import { ChevronDown } from "tabler-icons-react";
import icons from "../icons";

const useStyles = createStyles((theme, { opened, width = 180 }) => ({
  control: {
    width: width,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 10px",
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

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

const CountryMenu = ({ isSmall = false, data, country, setCountry }) => {
  if (!data || !country) return null;

  const [opened, setOpened] = useState(false);
  const width = isSmall ? 70 : 180;
  const { classes } = useStyles({ opened, width });

  const items = data.map((item) => (
    <Menu.Item
      icon={<Image src={icons[item.code]} width={18} height={18} />}
      onClick={() => {
        setCountry(item);
      }}
      key={item.name}
    >
      {item.name}
    </Menu.Item>
  ));

  return (
    <Menu
      transition="pop"
      transitionDuration={150}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      control={
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <Image src={icons[country.code]} width={22} height={22} />
            <span className={classes.label}>{!isSmall && country.name}</span>
          </Group>
          <ChevronDown size={16} className={classes.icon} />
        </UnstyledButton>
      }
    >
      {items}
    </Menu>
  );
};

export default CountryMenu;
