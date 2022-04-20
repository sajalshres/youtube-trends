import { useEffect, useState, useRef } from "react";
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

const TitleLengthFrequency = ({ countryName = "us", countryMenu }) => {
  const targetRef = useRef();
  const [size, setSize] = useState({ width: null, height: null });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if (targetRef.current) {
      setSize({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }

    setLoading(true);
    const data = await fetchData({ countryName });
    setData(null);
    setData(data);
    setTimeout(() => setLoading(false), 3000);
  }, [countryName]);

  return (
    <Paper shadow="xl" p="md" style={{ minHeight: "580px" }} ref={targetRef}>
      <Stack>
        <Group position="apart">
          <Text size="xl" transform="capitalize">
            Frequency of Title Length
          </Text>
          <Group position="right" spacing="xs">
            {countryMenu}
          </Group>
        </Group>
        <Skeleton visible={loading}>
          <Histogram data={data} width={size?.width} />
        </Skeleton>
      </Stack>
    </Paper>
  );
};

export default TitleLengthFrequency;
