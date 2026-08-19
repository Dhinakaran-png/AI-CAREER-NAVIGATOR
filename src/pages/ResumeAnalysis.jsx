import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeAnalysis() {

  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {

    const savedAnalysis =
      localStorage.getItem("resumeAnalysis");

    if (savedAnalysis) {

      try {

        setAnalysis(JSON.parse(savedAnalysis));

      } catch (error) {

        console.error(
          "Analysis data error:",
          error
        );

      }

    }

  }, []);


  if (!analysis) {

    return (

      <div className="analysis-page">

        <div className="analysis-empty">

          <div className="empty-robot">
            🤖
          </div>

          <h1>
            Resume AI Analysis
          </h1>

          <p>
            Upload your resume to generate AI insights.
          </p>

          <button
            onClick={() => navigate("/resume")}
          >
            Upload Resume
          </button>

        </div>

      </div>

    );

  }


  const skills = analysis.skills || [];

  const recommendations =
    analysis.recommendations || [];

  const categories =
    analysis.categoryAnalysis || {};

  const atsScore =
    Number(analysis.atsScore) || 0;


  return (

    <div className="analysis-page">

      <div className="analysis-container">


        {/* HEADER */}

        <div className="analysis-header">

          <div className="analysis-robot">
            🤖
          </div>

          <div>

            <h1>
              Resume AI Analysis
            </h1>

            <p>
              AI-powered insights from your resume
            </p>

          </div>

        </div>


        {/* ========================= */}
        {/* ATS SCORE */}
        {/* ========================= */}

        <div className="ats-score-section">

          <div className="ats-score-header">

            <div>

              <p className="card-label">
                RESUME INTELLIGENCE
              </p>

              <h2>
                ATS Score
              </h2>

              <p className="ats-description">
                Your resume compatibility with
                Applicant Tracking Systems.
              </p>

            </div>

          </div>


          <div className="ats-score-content">


            {/* ATS CIRCLE */}

            <div
              className="ats-circle"
              style={{
                "--score": atsScore
              }}
            >

              <div className="ats-circle-inner">

                <strong>
                  {atsScore}
                </strong>

                <span>
                  / 100
                </span>

              </div>

            </div>


            {/* ATS INFORMATION */}

            <div className="ats-info">

              <h3>

                {atsScore >= 80
                  ? "Excellent Resume"
                  : atsScore >= 60
                  ? "Good Resume"
                  : "Needs Improvement"}

              </h3>

              <p>

                {atsScore >= 80
                  ? "Your resume has strong ATS compatibility."
                  : atsScore >= 60
                  ? "Your resume has good ATS compatibility, but there is room for improvement."
                  : "Your resume needs optimization to improve ATS compatibility."}

              </p>


              <div className="ats-progress">

                <div
                  className="ats-progress-fill"
                  style={{
                    width: `${atsScore}%`
                  }}
                ></div>

              </div>


              <div className="ats-scale">

                <span>
                  0
                </span>

                <span>
                  50
                </span>

                <span>
                  100
                </span>

              </div>

            </div>

          </div>


          {/* ATS FACTORS */}

          <div className="ats-factors">

            <div className="ats-factor">

              <span className="factor-icon">
                ✓
              </span>

              <div>

                <strong>
                  Keywords
                </strong>

                <p>
                  Resume keyword optimization
                </p>

              </div>

            </div>


            <div className="ats-factor">

              <span className="factor-icon">
                ✓
              </span>

              <div>

                <strong>
                  Skills
                </strong>

                <p>
                  Relevant skills detected
                </p>

              </div>

            </div>


            <div className="ats-factor">

              <span className="factor-icon">
                ✓
              </span>

              <div>

                <strong>
                  Formatting
                </strong>

                <p>
                  ATS-friendly structure
                </p>

              </div>

            </div>


            <div className="ats-factor">

              <span className="factor-icon">
                ✓
              </span>

              <div>

                <strong>
                  Readability
                </strong>

                <p>
                  Clear resume content
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ========================= */}
        {/* RESUME SUMMARY */}
        {/* ========================= */}

        <div className="analysis-card">

          <p className="card-label">
            RESUME SUMMARY
          </p>

          <h2>
            AI Resume Overview
          </h2>

          <p className="summary-text">

            {analysis.summary ||
              "Upload your resume to generate an AI summary."}

          </p>

        </div>


        {/* ========================= */}
        {/* SKILLS ANALYSIS */}
        {/* ========================= */}

        <div className="skills-analysis-section">

          <div className="skills-analysis-header">

            <div>

              <p className="card-label">
                SKILL INTELLIGENCE
              </p>

              <h2>
                Skills Analysis
              </h2>

              <p className="skills-description">
                Skills detected from your uploaded resume.
              </p>

            </div>


            <div className="skills-total">

              <strong>
                {skills.length}
              </strong>

              <span>
                Skills
              </span>

            </div>

          </div>


          <div className="skills-analysis-grid">

            {skills.length > 0 ? (

              skills.map((skill, index) => (

                <div
                  className="skill-analysis-card"
                  key={index}
                >

                  <div className="skill-icon">

                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}

                  </div>

                  <div className="skill-content">

                    <h3>
                      {skill}
                    </h3>

                    <p>
                      Resume detected skill
                    </p>

                  </div>

                  <div className="skill-status">
                    ✓
                  </div>

                </div>

              ))

            ) : (

              <div className="no-skills">

                <h3>
                  No Skills Detected
                </h3>

                <p>
                  No technical or professional
                  skills were detected.
                </p>

              </div>

            )}

          </div>

        </div>


        {/* ========================= */}
        {/* CATEGORY ANALYSIS */}
        {/* ========================= */}

        <div className="analysis-card">

          <p className="card-label">
            SKILL CATEGORIES
          </p>

          <h2>
            Technical Skill Breakdown
          </h2>

          <div className="category-grid">

            {Object.keys(categories).length > 0 ? (

              Object.keys(categories).map(
                (category, index) => (

                  <div
                    className="category-box"
                    key={index}
                  >

                    <h3>
                      {category}
                    </h3>

                    <p>

                      {Array.isArray(
                        categories[category]
                      )
                        ? categories[category].join(", ")
                        : categories[category]}

                    </p>

                  </div>

                )
              )

            ) : (

              <p>
                No category analysis available.
              </p>

            )}

          </div>

        </div>


        {/* ========================= */}
        {/* STRENGTHS + IMPROVEMENTS */}
        {/* ========================= */}

        <div className="analysis-grid">


          {/* STRENGTHS */}

          <div className="analysis-card">

            <p className="card-label">
              STRENGTHS
            </p>

            <h2>
              Your Advantages
            </h2>

            {analysis.strengths?.length > 0 ? (

              <ul className="analysis-list">

                {analysis.strengths.map(
                  (item, index) => (

                    <li key={index}>
                      ✓ {item}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>
                No strengths available.
              </p>

            )}

          </div>


          {/* IMPROVEMENTS */}

          <div className="analysis-card">

            <p className="card-label">
              IMPROVEMENT
            </p>

            <h2>
              Areas to Improve
            </h2>

            {analysis.weaknesses?.length > 0 ? (

              <ul className="analysis-list">

                {analysis.weaknesses.map(
                  (item, index) => (

                    <li key={index}>
                      → {item}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>
                No improvement areas available.
              </p>

            )}

          </div>

        </div>


        {/* ========================= */}
        {/* CAREER SUGGESTIONS */}
        {/* ========================= */}

        <div className="analysis-card">

          <p className="card-label">
            CAREER INTELLIGENCE
          </p>

          <h2>
            Career Suggestions
          </h2>

          <div className="career-grid">

            {analysis.careerSuggestions?.length > 0 ? (

              analysis.careerSuggestions.map(
                (career, index) => (

                  <div
                    className="career-card"
                    key={index}
                  >

                    <div className="career-number">
                      {index + 1}
                    </div>

                    <div>

                      <h3>
                        {career}
                      </h3>

                      <p>
                        Recommended career path
                      </p>

                    </div>

                  </div>

                )
              )

            ) : (

              <p>
                No career suggestions available.
              </p>

            )}

          </div>

        </div>


        {/* ========================= */}
        {/* AI RECOMMENDATIONS */}
        {/* ========================= */}

        <div className="analysis-card ai-recommendation">

          <div className="recommendation-icon">
            ✦
          </div>

          <div>

            <p className="card-label">
              AI RECOMMENDATION
            </p>

            {recommendations.length > 0 ? (

              <ul className="analysis-list">

                {recommendations.map(
                  (item, index) => (

                    <li key={index}>
                      {item}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>

                {analysis.summary ||
                  "Continue improving your resume to increase your career opportunities."}

              </p>

            )}

          </div>

        </div>


        {/* ========================= */}
        {/* BUTTON */}
        {/* ========================= */}

        <button
          className="analyze-again"
          onClick={() => navigate("/resume")}
        >
          Analyze Another Resume
        </button>


      </div>

    </div>

  );

}

export default ResumeAnalysis;