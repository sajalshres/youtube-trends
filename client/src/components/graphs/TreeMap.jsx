import { Container } from "@mantine/core";
import { ResponsiveTreeMap } from "@nivo/treemap";

const TreeMap = ({ data, labelBy }) => {
  if (!data) return null;

  return (
    <Container size="lg" style={{ height: "550px", maxWidth: "100%" }}>
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="count"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        // colors={{ scheme: "set3" }}

        colors={[
          "#1A85FF",
          "#1f78b4",
          "#fb9a99",
          "#ff7f00",
          "#6a3d9a",
          "#b15928",
          "#fdb462",
          "#bc80bd",
          "#40B0A6",
          "#9D02D7",
          "#27647B",
        ]}
        labelSkipSize={32}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.2]],
        }}
        label={(node) => {
          let { id, formattedValue } = node;
          if (labelBy === "count") return formattedValue;

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
