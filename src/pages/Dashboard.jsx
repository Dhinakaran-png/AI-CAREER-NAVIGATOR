import React, {
  useRef,
  useEffect,
  useState
} from "react";

import html2canvas from "html2canvas";

import "./Dashboard.css";

import ATSChart from "../components/charts/ATSChart";
import SkillsChart from "../components/charts/SkillsChart";
import JobMatchChart from "../components/charts/JobMatchChart";
import CareerChart from "../components/charts/CareerChart";



function Dashboard(){


const dashboardRef = useRef();


const [analysis,setAnalysis] = useState(null);




useEffect(()=>{


const data =
localStorage.getItem(
"resumeAnalysis"
);



if(data){

setAnalysis(
JSON.parse(data)
);

}



},[]);







const saveDashboard = async()=>{


const canvas =
await html2canvas(

dashboardRef.current,

{

scale:2,

useCORS:true,

backgroundColor:"#020617"

}

);



const link =
document.createElement("a");


link.download =
"AI-Career-Navigator-Dashboard.png";


link.href =
canvas.toDataURL(
"image/png"
);


link.click();


};






return (


<div className="dashboard-page">



<div className="dashboard-toolbar">


<button

className="save-btn"

onClick={saveDashboard}

>

💾 Save Dashboard

</button>


</div>







<div ref={dashboardRef}>


<div className="dashboard-header">


<h1>
AI Resume Analysis Dashboard
</h1>


<p>
AI powered resume evaluation and career prediction
</p>


</div>







<div className="dashboard-grid">





{/* ATS SCORE */}


<div className="dashboard-card score-card">


<h2>
ATS Score
</h2>



<ATSChart
score={
analysis?.atsScore || 0
}
/>



<h1>

{
analysis
?
analysis.atsScore
:
0
}%

</h1>



<p>
Resume Optimization Score
</p>



</div>









{/* SUMMARY */}


<div className="dashboard-card">


<h2>
Resume Summary
</h2>



<p>

{
analysis
?
analysis.summary
:
"Upload resume to generate analysis"

}

</p>



</div>











{/* SKILLS */}



<div className="dashboard-card">


<h2>
Top Skills
</h2>



<SkillsChart

skills={
analysis?.skills || []
}

/>



</div>











{/* CATEGORY ANALYSIS */}



<div className="dashboard-card">


<h2>
Skill Categories
</h2>



{

analysis?.categoryAnalysis &&

Object.keys(
analysis.categoryAnalysis
).map((category,index)=>(


<div
className="category-item"
key={index}
>


<h3>
{category}
</h3>


<p>

{
analysis.categoryAnalysis[category]
.join(", ")

}

</p>


</div>


))

}



</div>









{/* JOB MATCH */}



<div className="dashboard-card">


<h2>
Job Match
</h2>



<JobMatchChart />



<div className="job-item">

<h3>
MERN Stack Developer
</h3>

<p>
96% Match
</p>


</div>




<div className="job-item">

<h3>
Frontend Developer
</h3>

<p>
94% Match
</p>


</div>





<div className="job-item">

<h3>
AI Developer
</h3>

<p>
88% Match
</p>


</div>




</div>









{/* CAREER */}



<div className="dashboard-card">


<h2>
Career Growth
</h2>



<CareerChart />



<h3>
AI Suggestions
</h3>



<ul>


{

analysis?.recommendations ?

analysis.recommendations.map(
(item,index)=>(


<li key={index}>
✔ {item}
</li>


))


:

<li>
Upload resume first
</li>


}


</ul>


</div>









{/* AI MESSAGE */}



<div className="dashboard-card ai-message">


<h2>
AI Recommendation
</h2>



<p>


{
analysis
?
analysis.summary
:
"AI will analyze your resume"
}


</p>



</div>






</div>



</div>



</div>


);


}



export default Dashboard;