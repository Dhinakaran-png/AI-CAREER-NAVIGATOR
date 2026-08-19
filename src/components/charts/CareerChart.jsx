import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 70 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 84 },
  { month: "May", score: 92 },
  { month: "Jun", score: 96 }
];

function CareerChart() {
  return (
    <LineChart
      width={400}
      height={250}
      data={data}
    >
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="score"
        stroke="#00E5FF"
        strokeWidth={3}
      />
    </LineChart>
  );
}

export default CareerChart;