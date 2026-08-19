import fs from "fs";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";



// =================================
// RESUME TEXT EXTRACTION
// =================================

export const extractResumeText = async (file) => {

  let text = "";


  if (file.mimetype === "application/pdf") {


    const dataBuffer =
      fs.readFileSync(file.path);



    const parser =
      new PDFParse({

        data: dataBuffer

      });



    const result =
      await parser.getText();



    text = result.text;



    await parser.destroy();


  }



  else if (

    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

  ) {


    const result =
      await mammoth.extractRawText({

        path: file.path

      });



    text = result.value;


  }



  else {


    text =
      fs.readFileSync(

        file.path,

        "utf8"

      );


  }



  return text;


};







// =================================
// AI RESUME SKILL ANALYSIS
// =================================


export const analyzeResume = (text) => {



const skillDatabase = [


/* FRONTEND */


{
name:"HTML",
category:"Frontend",
keywords:["html","html5"]
},


{
name:"CSS",
category:"Frontend",
keywords:["css","css3"]
},


{
name:"JavaScript",
category:"Frontend",
keywords:["javascript","js","ecmascript"]
},


{
name:"TypeScript",
category:"Frontend",
keywords:["typescript","ts"]
},


{
name:"React",
category:"Frontend",
keywords:["react","react.js","reactjs"]
},


{
name:"Next.js",
category:"Frontend",
keywords:["next.js","nextjs"]
},


{
name:"Angular",
category:"Frontend",
keywords:["angular"]
},


{
name:"Vue.js",
category:"Frontend",
keywords:["vue","vuejs"]
},


{
name:"Redux",
category:"Frontend",
keywords:["redux"]
},


{
name:"Tailwind CSS",
category:"Frontend",
keywords:["tailwind"]
},


{
name:"Bootstrap",
category:"Frontend",
keywords:["bootstrap"]
},




/* BACKEND */


{
name:"Node.js",
category:"Backend",
keywords:["node","nodejs","node.js"]
},


{
name:"Express.js",
category:"Backend",
keywords:["express","express.js"]
},


{
name:"Python",
category:"Backend",
keywords:["python"]
},


{
name:"Django",
category:"Backend",
keywords:["django"]
},


{
name:"Java Spring Boot",
category:"Backend",
keywords:["spring boot","spring"]
},


{
name:"REST API",
category:"Backend",
keywords:["rest api","api"]
},





/* DATABASE */


{
name:"MongoDB",
category:"Database",
keywords:["mongodb","mongo"]
},


{
name:"MySQL",
category:"Database",
keywords:["mysql"]
},


{
name:"PostgreSQL",
category:"Database",
keywords:["postgresql"]
},


{
name:"Firebase",
category:"Database",
keywords:["firebase"]
},





/* CLOUD & DEVOPS */


{
name:"AWS",
category:"Cloud",
keywords:["aws"]
},


{
name:"Azure",
category:"Cloud",
keywords:["azure"]
},


{
name:"Docker",
category:"DevOps",
keywords:["docker"]
},


{
name:"Kubernetes",
category:"DevOps",
keywords:["kubernetes","k8s"]
},


{
name:"Git",
category:"DevOps",
keywords:["git","github","gitlab"]
},





/* AI & DATA */


{
name:"Artificial Intelligence",
category:"AI",
keywords:["artificial intelligence","ai"]
},


{
name:"Machine Learning",
category:"AI",
keywords:["machine learning","ml"]
},


{
name:"Deep Learning",
category:"AI",
keywords:["deep learning"]
},


{
name:"TensorFlow",
category:"AI",
keywords:["tensorflow"]
},


{
name:"PyTorch",
category:"AI",
keywords:["pytorch"]
},





/* DATA SCIENCE */


{
name:"Data Science",
category:"Data",
keywords:["data science"]
},


{
name:"Pandas",
category:"Data",
keywords:["pandas"]
},


{
name:"NumPy",
category:"Data",
keywords:["numpy"]
},


{
name:"Power BI",
category:"Data",
keywords:["power bi"]
},





/* TESTING */


{
name:"Jest",
category:"Testing",
keywords:["jest"]
},


{
name:"Selenium",
category:"Testing",
keywords:["selenium"]
},


{
name:"Cypress",
category:"Testing",
keywords:["cypress"]
},





/* MOBILE */


{
name:"React Native",
category:"Mobile",
keywords:["react native"]
},


{
name:"Flutter",
category:"Mobile",
keywords:["flutter"]
},





/* PROGRAMMING */


{
name:"Data Structures",
category:"Programming",
keywords:["data structures","dsa"]
},


{
name:"Algorithms",
category:"Programming",
keywords:["algorithm"]
},


{
name:"System Design",
category:"Programming",
keywords:["system design"]
}



];






// convert resume text lowercase

const resumeText =
text.toLowerCase();





// detect skills

const detectedSkills =

skillDatabase.filter(skill =>

skill.keywords.some(keyword =>

resumeText.includes(keyword)

)

);





const skills =

detectedSkills.map(skill => skill.name);






// category wise analysis

const categoryAnalysis = {};



detectedSkills.forEach(skill => {


if(!categoryAnalysis[skill.category]){

categoryAnalysis[skill.category] = [];

}



categoryAnalysis[skill.category]
.push(skill.name);



});







// ATS SCORE

let atsScore = 50;



atsScore += skills.length * 3;



if(text.length > 2000){

atsScore += 10;

}



if(atsScore > 100){

atsScore = 100;

}







return {


atsScore,


skills,


categoryAnalysis,



summary:

`AI detected ${skills.length} technical skills from your resume.`,




recommendations:[


"Improve project descriptions",


"Add measurable achievements",


"Add GitHub portfolio link",


"Learn advanced cloud technologies",


"Improve ATS keywords"


]


};



};