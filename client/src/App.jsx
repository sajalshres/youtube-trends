import { useState, useEffect } from "react";
import { AppShell, Container, Stack, Grid } from "@mantine/core";

import { Header, Card, CountryMenu } from "./components";
import { Flag, GridDots, BrandYoutube, PlayerPlay } from "tabler-icons-react";

import {
  AvgHourToTrend,
  LikesAndView,
  PopularTags,
  TitleLengthFrequency,
  DayOfWeekTrend,
} from "./tasks";
import api from "./services/api";

const fetchCountries = async () => {
  const { data } = await api.get("/core/countries");
  return data;
};

const fetchStats = async () => {
  const { data } = await api.get("/core/stats");
  return data;
};

function App() {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(async () => {
    const data = await fetchCountries();

    setCountries(data);
    setCountry(data[10]);
    setStats(await fetchStats());
  }, []);

  return (
    <AppShell
      header={
        <Header
          height={60}
          countryMenu={
            <CountryMenu
              data={countries}
              country={country}
              setCountry={setCountry}
            />
          }
        />
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[1],
          height: "100%",
        },
      })}
    >
      <Container fluid style={{ maxWidth: "80vw" }}>
        <Stack>
          <Grid gutter="xs">
            <Grid.Col md={6} lg={3}>
              <Card
                icon={<Flag size={64} />}
                title="Countries"
                count={stats?.countries}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Card
                icon={<GridDots size={64} />}
                title="Categories"
                count={stats?.categories}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Card
                icon={<BrandYoutube size={64} />}
                title="Videos"
                count={stats?.videos.toLocaleString("en-US")}
              />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Card
                icon={<PlayerPlay size={64} />}
                title="Channels"
                count={stats?.channels.toLocaleString("en-US")}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter="xs">
            <Grid.Col span={6}>
              <LikesAndView
                countryName={country?.code.toLowerCase()}
                countryMenu={
                  <CountryMenu
                    isSmall={true}
                    data={countries}
                    country={country}
                    setCountry={setCountry}
                  />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TitleLengthFrequency
                countryName={country?.code.toLowerCase()}
                countryMenu={
                  <CountryMenu
                    isSmall={true}
                    data={countries}
                    country={country}
                    setCountry={setCountry}
                  />
                }
              />
            </Grid.Col>
          </Grid>
          <Grid gutter="xs">
            <Grid.Col span={12}>
              <PopularTags />
            </Grid.Col>
          </Grid>
          <Grid gutter="xs">
            <Grid.Col span={12}>
              <AvgHourToTrend
                countryName={country?.code.toLowerCase()}
                countryMenu={
                  <CountryMenu
                    isSmall={true}
                    data={countries}
                    country={country}
                    setCountry={setCountry}
                  />
                }
              />
            </Grid.Col>
          </Grid>
          <Grid gutter="xs">
            <Grid.Col span={12}>
              <DayOfWeekTrend />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </AppShell>
  );
}

export default App;
