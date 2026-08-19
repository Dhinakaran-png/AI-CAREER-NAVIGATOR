import {
  extractResumeText,
  analyzeResume
} from "../services/resumeAnalyzer.js";


// ======================================
// UPLOAD & ANALYZE RESUME
// ======================================

export const uploadResume = async (req, res) => {

  try {

    // Check uploaded file
    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Please upload resume file"
      });

    }


    console.log(
      "Resume Uploaded:",
      req.file.originalname
    );


    // ======================================
    // EXTRACT RESUME TEXT
    // ======================================

    const resumeText =
      await extractResumeText(req.file);


    if (!resumeText || !resumeText.trim()) {

      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume"
      });

    }


    console.log(
      "Resume Text Length:",
      resumeText.length
    );


    // ======================================
    // ANALYZE RESUME
    // ======================================

    const analysis =
      await analyzeResume(resumeText);


    console.log(
      "ATS Score:",
      analysis.atsScore
    );

    console.log(
      "Skills:",
      analysis.skills
    );


    // ======================================
    // SEND RESULT
    // ======================================

    return res.status(200).json({

      success: true,

      message:
        "Resume analyzed successfully",


      file: {

        name:
          req.file.originalname,

        size:
          req.file.size,

        type:
          req.file.mimetype

      },


      analysis: {

        atsScore:
          analysis.atsScore || 0,

        skills:
          analysis.skills || [],

        categoryAnalysis:
          analysis.categoryAnalysis || {},

        summary:
          analysis.summary || "",

        strengths:
          analysis.strengths || [],

        weaknesses:
          analysis.weaknesses || [],

        careerSuggestions:
          analysis.careerSuggestions || [],

        recommendations:
          analysis.recommendations || []

      }

    });

  }

  catch (error) {

    console.error(
      "Resume Analysis Error:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Resume analysis failed"

    });

  }

};