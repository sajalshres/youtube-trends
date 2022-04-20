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

import { Histogram } from "../components/graphs";

const fetchData = async ({ countryName }) => {
  let { data } = await api.get(
    `/tasks/frequency-title-length?country=${countryName}`
  );

  return data?.frequency;
};

const TitleLengthFrequency = ({ countryName = "us" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    const data = await fetchData({ countryName });

    setData(data);
    setLoading(false);
  }, [countryName]);

  return (
    <Paper shadow="xl" p="md" style={{ minHeight: "500px" }}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Frequency of Title Length
          </Text>
        </Group>
        <Skeleton visible={loading}>
          <Histogram data={data} />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default TitleLengthFrequency;
