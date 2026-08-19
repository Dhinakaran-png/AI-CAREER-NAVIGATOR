import {
  extractResumeText,
  analyzeResume
} from "../services/resumeAnalyzer.js";



// ===============================
// UPLOAD & ANALYZE RESUME
// ===============================

export const uploadResume = async (req, res) => {


  try {


    // Check file

    if (!req.file) {


      return res.status(400).json({

        success:false,

        message:"Please upload resume file"

      });


    }





    console.log("Uploaded File:");

    console.log(req.file);





    // Extract text from resume

    const resumeText =
      await extractResumeText(
        req.file
      );



    console.log(
      "Resume Text Length:",
      resumeText.length
    );






    // AI Resume Analysis

    const analysis =
      analyzeResume(
        resumeText
      );



    console.log(
      "Analysis Result:",
      analysis
    );







    // Send response

    res.status(200).json({


      success:true,


      message:
      "Resume analyzed successfully",



      file:{

        name:req.file.originalname,

        size:req.file.size,

        type:req.file.mimetype

      },



      analysis:{


        atsScore:
        analysis.atsScore,



        skills:
        analysis.skills,



        categoryAnalysis:
        analysis.categoryAnalysis,



        summary:
        analysis.summary,



        recommendations:
        analysis.recommendations


      }



    });





  }

  catch(error){



    console.log(
      "Resume Upload Error:",
      error
    );



    res.status(500).json({


      success:false,


      message:error.message


    });



  }



};