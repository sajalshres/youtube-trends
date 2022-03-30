import { AppShell, Text } from "@mantine/core";

import { Header } from "./components";

function App() {
  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      header={<Header />}
    >
      <Text>Application content</Text>
    </AppShell>
  );
}

export default App;
