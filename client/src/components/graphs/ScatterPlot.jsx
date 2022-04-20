import { Container } from "@mantine/core";
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

const ScatterPlot = ({ data }) => {
  if (!data) return null;

  return (
    <Container size="lg" style={{ height: "500px", maxWidth: "100%" }}>
      <ResponsiveScatterPlotCanvas
        data={data}
        margin={{ top: 60, right: 50, bottom: 70, left: 90 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        xFormat=">-.1f"
        yScale={{ type: "linear", min: 0, max: "auto" }}
        yFormat=">-.1f"
        blendMode="multiply"
        colors="#228be6"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Views (In Thousands)",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 0,
          tickRotation: 0,
          legend: "Likes (In Thousands)",
          legendPosition: "middle",
          legendOffset: -60,
        }}
      />
    </Container>
  );
};

export default ScatterPlot;
