import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

const ThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
      {colorScheme === "dark" ? <Sun size={16} /> : <MoonStars size={16} />}
    </ActionIcon>
  );
};

export default ThemeButton;
