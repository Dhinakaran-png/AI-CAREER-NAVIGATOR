import React from "react";

function Home() {
  return (
    <main className="home">
      <section className="hero">

        <div className="hero-content">
          <span className="badge">🤖 AI Powered Resume Intelligence</span>

          <h1>
            Build Your
            <br />
            Dream Career
            <span className="highlight"> with AI</span>
          </h1>

          <p>
            Upload your resume, improve your ATS score, discover skill gaps,
            receive AI career guidance, and find the best matching jobs—all in
            one intelligent platform.
          </p>

          <div className="hero-buttons">
            <button>Upload Resume</button>
            <button className="outline-btn">View Demo</button>
          </div>

          <div className="stats">
            <div>
              <h2>96%</h2>
              <p>ATS Score</p>
            </div>

            <div>
              <h2>12K+</h2>
              <p>Resumes</p>
            </div>

            <div>
              <h2>40s</h2>
              <p>Analysis</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="robot-card">

            <div className="robot-circle">
              🤖
            </div>

            <h2>Career AI</h2>

            <p>Resume Analyzer Online</p>

            <div className="pulse"></div>

          </div>
        </div>

      </section>

      <section className="features">

        <div className="feature-card">
          <h3>📄 Resume Analysis</h3>
          <p>
            Scan every section of your resume and receive instant AI feedback.
          </p>
        </div>

        <div className="feature-card">
          <h3>🎯 ATS Optimizer</h3>
          <p>
            Increase your ATS score with AI-powered recommendations.
          </p>
        </div>

        <div className="feature-card">
          <h3>💼 Job Matching</h3>
          <p>
            Discover jobs that perfectly match your skills and experience.
          </p>
        </div>

        <div className="feature-card">
          <h3>📈 Skill Gap</h3>
          <p>
            Learn the missing skills required for your dream job.
          </p>
        </div>

        <div className="feature-card">
          <h3>🧠 Career Prediction</h3>
          <p>
            AI predicts your next best career opportunity.
          </p>
        </div>

        <div className="feature-card">
          <h3>💬 AI Assistant</h3>
          <p>
            Chat with AI for interview preparation and career guidance.
          </p>
        </div>

      </section>
    </main>
  );
}

export default Home;