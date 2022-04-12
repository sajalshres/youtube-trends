import { Container, Center } from "@mantine/core";
import { ResponsiveBar, Bar } from "@nivo/bar";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

const BarChart = ({ data, height, width }) => {
  if (!data) return null;
  console.log({ dataIsHere: data });
  return (
    <Container size="sm" style={{ height: "700px", maxWidth: "80%" }}>
      <ResponsiveBar
        data={data}
        keys={["avgHours"]}
        indexBy="category"
        margin={{ top: 50, right: 10, bottom: 50, left: 100 }}
        padding={0.6}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        colors="#3182CE"
        animate={true}
        enableLabel={true}
        label={(d) => Math.round(d.value)}
        labelTextColor="#ffffff"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          enable: true,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Category",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          enable: true,
          tickSize: 0,
          tickPadding: 0,
          tickRotation: 0,
          legend: "Avg Hours",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        theme={{
          fontSize: 10,
        }}
        tooltipLabel={(item) => item.indexValue}
      />
    </Container>
  );
};

export default BarChart;
