import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function SkillsChart({ skills = [] }) {


  const data = Array.isArray(skills)

    ? skills.map((skill, index) => ({

        skill:
          typeof skill === "string"
          ? skill
          : skill.name,


        score:
          typeof skill === "object"
          ? skill.score || 90
          : 95 - (index * 5)

      }))

    : [];




  return (

    <div
      style={{
        width:"100%",
        height:250
      }}
    >


      {
        data.length > 0 ?


        <ResponsiveContainer
          width="100%"
          height="100%"
        >


          <BarChart
            data={data}
          >


            <XAxis
              dataKey="skill"
            />


            <YAxis
              domain={[0,100]}
            />


            <Tooltip />


            <Bar

              dataKey="score"

              fill="#00E5FF"

              radius={[
                8,
                8,
                0,
                0
              ]}

            />


          </BarChart>


        </ResponsiveContainer>



        :


        <p>
          No skills detected. Upload resume again.
        </p>


      }


    </div>

  );

}


export default SkillsChart;