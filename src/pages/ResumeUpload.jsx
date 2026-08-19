import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadResume } from "../api/resumeApi";

function ResumeUpload() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

    setMessage("");

  };


  const handleUpload = async () => {

    if (!file) {

      setMessage(
        "Please select your resume."
      );

      return;

    }


    try {

      setLoading(true);

      setMessage(
        "AI is analyzing your resume..."
      );


      const result =
        await uploadResume(file);


      if (!result.success) {

        throw new Error(
          result.message ||
          "Resume analysis failed"
        );

      }


      // Save analysis result
      localStorage.setItem(
        "resumeAnalysis",
        JSON.stringify(result.analysis)
      );


      // Open analysis page
      navigate("/resume-analysis");


    } catch (error) {

      console.error(
        "Resume Upload Error:",
        error
      );


      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Resume upload failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="resume-upload-page">

      <div className="resume-upload-card">

        <div className="upload-robot">
          🤖
        </div>


        <h1>
          Resume AI
        </h1>

        <p>
          Upload your resume and let AI
          analyze your career profile.
        </p>


        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />


        {file && (

          <p className="selected-file">
            Selected: {file.name}
          </p>

        )}


        <button
          onClick={handleUpload}
          disabled={loading}
        >

          {loading
            ? "Analyzing..."
            : "Analyze Resume"}

        </button>


        {message && (

          <p className="upload-message">
            {message}
          </p>

        )}

      </div>

    </div>

  );

}

export default ResumeUpload;