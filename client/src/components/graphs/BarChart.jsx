import { Container, Center } from "@mantine/core";
import { ResponsiveBar, Bar } from "@nivo/bar";

const BarChart = ({ data, color }) => {
  if (!data) return null;

  return (
    <Container size="lg" style={{ height: "700px", maxWidth: "100%" }}>
      <ResponsiveBar
        data={data}
        keys={["avgHours"]}
        indexBy="category"
        margin={{ top: 50, right: 10, bottom: 50, left: 100 }}
        padding={0.6}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        colors={color}
        animate={true}
        enableLabel={true}
        label={(d) => d.value}
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
          fontSize: "0.6em",
        }}
        tooltipLabel={(item) => item.indexValue}
      />
    </Container>
  );
};

export default BarChart;
