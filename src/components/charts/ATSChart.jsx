import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Score", value: 96 },
  { name: "Remaining", value: 4 }
];

const COLORS = ["#00E5FF", "#1E293B"];

function ATSChart() {
  return (
    <PieChart width={250} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={90}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>

      <Tooltip />
    </PieChart>
  );
}

export default ATSChart;