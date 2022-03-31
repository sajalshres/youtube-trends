import { AppShell, Container, Stack, Grid, Button } from "@mantine/core";

import { Header, Card } from "./components";

function App() {
  return (
    <AppShell header={<Header height={60} />}>
      <Container fluid>
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
        </Stack>
      </Container>
    </AppShell>
  );
}

export default App;
