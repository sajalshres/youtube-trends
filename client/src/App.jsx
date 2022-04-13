import { useState, useEffect } from "react";
import { AppShell, Container, Stack, Grid } from "@mantine/core";

import { Header, Card, BarChart, CountryMenu } from "./components";
import { AvgHourToTrend } from "./tasks";
import api from "./services/api";

const fetchCountries = async () => {
  const { data } = await api.get("/tools/countries");
  return data;
};

function App() {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(async () => {
    const data = await fetchCountries();

    setCountries(data);
    setCountry(data[10]);
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
          height: "150vh",
        },
      })}
    >
      <Container fluid style={{ maxWidth: "80vw" }}>
        <Stack>
          <Grid gutter="xs">
            <Grid.Col md={6} lg={3}>
              <Card />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Card />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Card />
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Card />
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
        </Stack>
      </Container>
    </AppShell>
  );
}

export default App;
