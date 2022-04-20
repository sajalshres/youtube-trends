import {
  Histogram as HistogramChart,
  BarSeries,
  withParentSize,
  XAxis,
  YAxis,
} from "@data-ui/histogram";
import { useEffect, useRef } from "react";
import * as ReactDom from "react-dom";

// https://williaster.github.io/data-ui/?selectedKind=histogram&selectedStory=normalized&full=0&addons=0&stories=1&panelRight=0

const ResponsiveHistogram = withParentSize(
  ({ parentWidth, parentHeight, ...rest }) => (
    <HistogramChart width={parentWidth} height={parentHeight} {...rest} />
  )
);

const Histogram = ({ data }) => {
  if (!data) return null;

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        const element = document.querySelector('[class="vx-bar"][y="0"]');
        element.setAttribute("fill", "orange");
      }, 2000);
    }
  }, []);

  return (
    <ResponsiveHistogram
      width={650}
      height={497}
      ariaLabel="My histogram of ..."
      orientation="vertical"
      valueAccessor={(datum) => datum}
      renderTooltip={({ event, datum, data, color }) => (
        <div>
          <strong style={{ color }}>
            {datum.bin0} to {datum.bin1}
          </strong>
          <div>
            <strong>count </strong>
            {datum.count}
          </div>
          <div>
            <strong>cumulative </strong>
            {datum.cumulative}
          </div>
          <div>
            <strong>density </strong>
            {datum.density}
          </div>
        </div>
      )}
    >
      <BarSeries
        showArea={false}
        smoothing={0.01}
        kernel="parabolic"
        fill="#228be6"
        rawData={data}
      />
      <XAxis label="Title Length" />
      <YAxis label="Count" />
    </ResponsiveHistogram>
  );
};

export default Histogram;
