import React, { useState } from "react";
import { uploadResume } from "../api/resumeApi";

function ResumeUpload() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);
    setMessage("");

  };

  const handleUpload = async () => {

    if (!file) {

      setMessage("Please select a resume first.");
      return;

    }

    try {

      setLoading(true);
      setMessage("");

      const result = await uploadResume(file);

      setMessage(
        result.message || "Resume uploaded successfully!"
      );

    } catch (error) {

      console.error("Resume Upload Error:", error);

      setMessage(
        error.response?.data?.message ||
        "Resume upload failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="resume-upload-page">

      <div className="resume-upload-card">

        <h1>
          Upload Your Resume
        </h1>

        <p>
          Upload your resume for AI-powered career analysis.
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />

        {file && (
          <p>
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
        >

          {loading
            ? "Uploading..."
            : "Upload Resume"
          }

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