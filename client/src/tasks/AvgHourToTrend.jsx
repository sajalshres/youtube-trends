import { orderBy } from "lodash";
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
import { useToggle } from "@mantine/hooks";
import { SortAscending, SortDescending } from "tabler-icons-react";

import { BarChart, ColorMenu } from "../components";
import api from "../services/api";

const AvgHourToTrend = ({ countryName = "us", countryMenu }) => {
  const theme = useMantineTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, toggleSortOrder] = useToggle("asc", ["desc", "asc"]);
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(theme.colors.blue[6]);
    const fetchData = async () => {
      setLoading(true);

      let { data } = await api.get(
        `/tasks/avg-hours-of-trending-videos?country=${countryName}`
      );

      data = data.map((item) => ({
        category: item.category,
        avgHours: parseFloat(item.avg_hours_to_trend.toFixed(2)),
      }));

      setLoading(false);
      setData(data);
    };

    fetchData();
  }, [countryName]);

  const sortData = () => {
    const choices = { asc: "desc", desc: "asc" };
    toggleSortOrder();
    const newData = orderBy(data, ["avgHours"], choices[sortOrder]);
    setData(newData);
  };

  return (
    <Paper shadow="xs" p="md" style={{ minHeight: "750px" }}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Average Hours To Trend
          </Text>
          <Group position="right" spacing="xs">
            {countryMenu}
            <ActionIcon variant="default" size={32} onClick={() => sortData()}>
              {sortOrder === "asc" ? <SortAscending /> : <SortDescending />}
            </ActionIcon>
            <ColorMenu
              color={color}
              setColor={setColor}
              colors={theme.colors}
            />
          </Group>
        </Group>
        <Skeleton visible={loading}>
          <BarChart data={data} color={color} />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default AvgHourToTrend;
