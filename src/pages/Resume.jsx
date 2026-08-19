import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Resume() {


  const navigate = useNavigate();


  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);





  const handleFileChange = (e) => {


    const selectedFile = e.target.files[0];


    if(!selectedFile){
      return;
    }



    const allowedTypes = [

      "application/pdf",

      "application/msword",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

      "text/plain"

    ];




    if(!allowedTypes.includes(selectedFile.type)){


      setMessage(
        "Only PDF, DOC, DOCX and TXT files are allowed"
      );


      setFile(null);

      return;

    }



    setFile(selectedFile);

    setMessage("");

  };








  const handleUpload = async()=>{


    if(!file){


      setMessage(
        "Please select your resume file"
      );


      return;

    }



    setLoading(true);



    const formData = new FormData();



    formData.append(
      "resume",
      file
    );





    try{


      const response = await fetch(

        "http://localhost:5000/api/resume/upload",

        {

          method:"POST",


          headers:{


            Authorization:

            `Bearer ${localStorage.getItem("token")}`


          },


          credentials:"include",


          body:formData


        }

      );





      const data = await response.json();



      console.log(
        "Resume API Response:",
        data
      );





      if(data.success){



        localStorage.setItem(

          "resumeAnalysis",

          JSON.stringify(data.analysis)

        );





        setMessage(

          "Resume analyzed successfully"

        );





        setTimeout(()=>{

                navigate("/resume-analysis");


        },1000);



      }



      else{


        setMessage(

          data.message ||

          "Resume analysis failed"

        );


      }





    }

    catch(error){


      console.log(error);


      setMessage(

        "Server connection failed"

      );


    }



    finally{


      setLoading(false);


    }


  };








  return (


    <div className="resume-page">





      <div className="resume-container">



        <h1>
          AI Resume Analyzer
        </h1>



        <p>

          Upload your resume and let AI analyze
          ATS score, skills, strengths and career
          opportunities.

        </p>







        <div className="upload-box">



          <div className="upload-icon">

            📄

          </div>





          <h2>

            Upload Resume

          </h2>





          <p>

            PDF • DOC • DOCX • TXT

          </p>








          <label className="browse-btn">



            Select File





            <input


              type="file"


              accept=".pdf,.doc,.docx,.txt"


              onChange={handleFileChange}


              hidden


            />



          </label>









          {

            file &&


            <p>

              Selected:

              <br/>

              {file.name}


            </p>


          }









          <button


            className="browse-btn"


            onClick={handleUpload}


            disabled={loading}


          >


          {

            loading

            ?

            "Analyzing Resume..."

            :

            "Upload Resume"


          }



          </button>







          <p>

            {message}

          </p>





        </div>




      </div>









      <div className="scanner-card">



        <div className="scanner-circle">

          🤖

        </div>





        <h2>

          AI Scanner

        </h2>





        <p>

          Ready to analyze your resume

        </p>







        <div className="scan-bar">


          <div className="scan-progress">


          </div>


        </div>





      </div>







    </div>


  );


}



export default Resume;