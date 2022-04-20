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
import { ScatterPlot } from "../components/graphs";

const LikesAndView = ({ countryName = "us" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let { data: rawData } = await api.get(
        `/tasks/correlation-likes-and-view?country=${countryName}`
      );

      const data = rawData.map((item) => ({
        x: item.view_count / 1000,
        y: item.likes / 1000,
      }));

      setData([{ id: "LikesAndView", data: data }]);

      setTimeout(() => setLoading(false), 3000);
    };

    fetchData();
  }, [countryName]);

  return (
    <Paper shadow="xl" p="md" style={{ minHeight: "550px" }}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Correlation between likes and views
          </Text>
        </Group>
        <Skeleton visible={loading}>
          <ScatterPlot data={data} />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default LikesAndView;
