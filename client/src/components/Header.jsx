import { Header as MantineHeader, Text } from "@mantine/core";

const Header = () => {
  return (
    <MantineHeader height={70} p="md">
      {/* Handle other responsive styles with MediaQuery component or createStyles function */}
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Text>Application header</Text>
      </div>
    </MantineHeader>
  );
};

export default Header;
