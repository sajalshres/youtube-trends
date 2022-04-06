import {
  AppShell,
  Container,
  Stack,
  Grid,
  Button,
  MediaQuery,
  Paper,
} from "@mantine/core";

import { Header, Card, BarChart } from "./components";

function App() {
  return (
    <AppShell
      header={<Header height={60} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[1],
          height: "100vh",
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
            <Grid.Col md={6} lg={6}>
              <Paper shadow="xs" p="md">
                <BarChart />
              </Paper>
            </Grid.Col>
            <Grid.Col md={6} lg={6}>
              <Paper shadow="xs" p="md">
                <BarChart />
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </AppShell>
  );
}

export default App;
