import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Group,
  Paper,
  Stack,
  Text,
  Skeleton,
  Menu,
  Button,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { Filter, Numbers, LetterA } from "tabler-icons-react";

import { TreeMap } from "../components/graphs";

const LimitMenu = ({ limit, setLimit }) => {
  const [opened, setOpened] = useState(false);

  const limits = [10, 20, 30];

  const menuItems = limits.map((limit) => {
    return (
      <Menu.Item
        key={limit}
        onClick={() => {
          setLimit(limit);
        }}
      >{`Top ${limit}`}</Menu.Item>
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
        <Button leftIcon={<Filter size={24} />} variant="filled">
          Top {limit}
        </Button>
      }
    >
      {menuItems}
    </Menu>
  );
};

const PopularTags = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [labelBy, toggleLabelBy] = useToggle("name", ["name", "count"]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let { data: rawData } = await api.get(
        `/tasks/most-popular-tags?limit=${limit}`
      );

      setData(rawData);

      setTimeout(() => setLoading(false), 3000);
    };

    fetchData();
  }, [limit]);

  return (
    <Paper shadow="xl" p="md" style={{ minHeight: "600px" }}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Most Popular Tags
          </Text>
          <Group position="right" spacing="xs">
            <LimitMenu limit={limit} setLimit={setLimit} />
            <ActionIcon
              variant="filled"
              size="lg"
              onClick={() => toggleLabelBy()}
              color="blue"
            >
              {labelBy === "name" ? (
                <LetterA size={16} />
              ) : (
                <Numbers size={16} />
              )}
            </ActionIcon>
          </Group>
        </Group>
        <Skeleton visible={loading}>
          <TreeMap data={data} labelBy={labelBy} />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default PopularTags;
