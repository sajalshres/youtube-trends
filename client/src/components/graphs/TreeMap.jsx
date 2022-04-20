import { Container } from "@mantine/core";
import { ResponsiveTreeMap } from "@nivo/treemap";

const TreeMap = ({ data }) => {
  if (!data) return null;

  return (
    <Container size="lg" style={{ height: "550px", maxWidth: "100%" }}>
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="count"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={32}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.2]],
        }}
        label={(node) => {
          let { id } = node;
          if (id.length > 10) {
            id = `${id.substring(0, 8)}...`;
          }
          return id;
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        parentLabelSize={15}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.1]],
        }}
        // theme={{
        //   fontSize: "0.6em",
        // }}
      />
    </Container>
  );
};

export default TreeMap;
