import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Group,
  Paper,
  Stack,
  Text,
  Skeleton,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { TreeMap } from "../components/graphs";

const PopularTags = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let { data: rawData } = await api.get("/tasks/most-popular-tags");

      setData(rawData);

      setTimeout(() => setLoading(false), 3000);
    };

    fetchData();
  }, []);

  return (
    <Paper shadow="xl" p="md" style={{ minHeight: "600px" }}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Most Popular Tags
          </Text>
        </Group>
        <Skeleton visible={loading}>
          <TreeMap data={data} />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default PopularTags;
