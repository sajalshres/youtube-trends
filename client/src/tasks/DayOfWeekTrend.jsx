import { useState, useEffect } from "react";
import {
  Group,
  Paper,
  Stack,
  Text,
  Skeleton,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";

import api from "../services/api";
import { LineChart } from "../components/graphs";

const fetchData = async () => {
  let { data } = await api.get("/tasks/day-of-week");

  return data;
};

const DayOfWeekTrend = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    const data = await fetchData();

    setData(data);
    setLoading(false);
  }, []);

  return (
    <Paper shadow="xl" p="md" style={{ minHeight: "500px" }}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Trend over day of week
          </Text>
        </Group>
        <Skeleton visible={loading}>
          <LineChart data={data} />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default DayOfWeekTrend;
