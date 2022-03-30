import { AppShell } from "@mantine/core";

import { Header } from "./components";

function App() {
  return (
    <AppShell padding="md" header={<Header height={60} />}>
      <p>Application content</p>
    </AppShell>
  );
}

export default App;
