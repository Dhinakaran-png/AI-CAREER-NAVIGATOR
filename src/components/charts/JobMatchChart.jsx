import React from "react";
import {
  RadialBarChart,
  RadialBar
} from "recharts";

const data = [
  {
    name: "Match",
    value: 98,
    fill: "#10B981"
  }
];

function JobMatchChart() {
  return (
    <RadialBarChart
      width={250}
      height={250}
      innerRadius="20%"
      outerRadius="90%"
      data={data}
      startAngle={180}
      endAngle={0}
    >
      <RadialBar
        dataKey="value"
      />
    </RadialBarChart>
  );
}

export default JobMatchChart;