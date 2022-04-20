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

const fetchData = async ({ countryName }) => {
  let { data: rawData } = await api.get(
    `/tasks/correlation-likes-and-view?country=${countryName}`
  );

  const data = rawData.map((item) => ({
    x: item.view_count / 1000,
    y: item.likes / 1000,
  }));

  return data;
};

const LikesAndView = ({ countryName = "us", countryMenu }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    const data = await fetchData({ countryName });
    setData([{ id: "LikesAndView", data: data }]);
    setTimeout(() => setLoading(false), 3000);
  }, [countryName]);

  return (
    <Paper shadow="xl" p="md" style={{ minHeight: "550px" }}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Correlation between likes and views
          </Text>
          <Group position="right" spacing="xs">
            {countryMenu}
          </Group>
        </Group>
        <Skeleton visible={loading}>
          <ScatterPlot data={data} />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default LikesAndView;
