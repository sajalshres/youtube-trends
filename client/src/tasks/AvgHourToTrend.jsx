import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  Skeleton,
} from "@mantine/core";
import { BarChart } from "../components";
import api from "../services/api";

const AvgHourToTrend = ({ country = "us" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log({ country });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let { data } = await api.get(
        `/tasks/avg-hours-of-trending-videos?country=${country}`
      );
      data = data.map((item) => ({
        category: item.category,
        avgHours: Math.round(item.avg_hours_to_trend),
      }));

      setLoading(false);
      setData(data);
    };

    fetchData();
  }, [country]);

  return (
    <Paper shadow="xs" p="md" style={{ minHeight: "750px" }}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Average Hours To Trend
          </Text>
          <Group position="right" spacing="xs">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </Group>
        </Group>
        <Skeleton visible={loading}>
          <BarChart data={data} height="750px" />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default AvgHourToTrend;
