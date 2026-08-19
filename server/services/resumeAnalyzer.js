import fs from "fs";
import path from "path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";


// ==========================================
// EXTRACT RESUME TEXT
// ==========================================

export const extractResumeText = async (file) => {

  const extension =
    path.extname(file.originalname).toLowerCase();

  const filePath = file.path;


  if (!fs.existsSync(filePath)) {

    throw new Error(
      "Uploaded resume file not found"
    );

  }


  // ==========================================
  // TXT
  // ==========================================

  if (extension === ".txt") {

    return fs.readFileSync(
      filePath,
      "utf8"
    );

  }


  // ==========================================
  // PDF
  // ==========================================

  if (extension === ".pdf") {

    try {

      const buffer =
        fs.readFileSync(filePath);

      const parser =
        new PDFParse({
          data: buffer
        });

      const result =
        await parser.getText();

      await parser.destroy();

      return result.text || "";

    } catch (error) {

      console.error(
        "PDF parsing error:",
        error
      );

      throw new Error(
        "Failed to extract text from PDF"
      );

    }

  }


  // ==========================================
  // DOCX
  // ==========================================

  if (extension === ".docx") {

    const result =
      await mammoth.extractRawText({
        path: filePath
      });

    return result.value || "";

  }


  throw new Error(
    "Only PDF, DOCX and TXT files are supported"
  );

};


// ==========================================
// ANALYZE RESUME
// ==========================================

export const analyzeResume = async (
  resumeText
) => {

  if (!resumeText) {

    throw new Error(
      "Resume text is empty"
    );

  }


  // Keep original text
  const text =
    resumeText.toLowerCase();


  // ==========================================
  // SKILL DATABASE
  // ==========================================

  const skillPatterns = {

    "HTML": [
      "html",
      "html5"
    ],

    "CSS": [
      "css",
      "css3"
    ],

    "JavaScript": [
      "javascript",
      "java script",
      "js"
    ],

    "TypeScript": [
      "typescript",
      "type script",
      "ts"
    ],

    "React": [
      "react",
      "reactjs",
      "react.js"
    ],

    "Node.js": [
      "node.js",
      "nodejs",
      "node js"
    ],

    "Express": [
      "express.js",
      "expressjs",
      "express js"
    ],

    "MongoDB": [
      "mongodb",
      "mongo db"
    ],

    "MySQL": [
      "mysql",
      "my sql"
    ],

    "Git": [
      "git"
    ],

    "GitHub": [
      "github",
      "git hub"
    ],

    "Python": [
      "python"
    ],

    "Java": [
      "java"
    ],

    "C++": [
      "c++"
    ],

    "Artificial Intelligence": [
      "artificial intelligence"
    ],

    "Machine Learning": [
      "machine learning"
    ],

    "AWS": [
      "aws",
      "amazon web services"
    ],

    "Docker": [
      "docker"
    ],

    "Kubernetes": [
      "kubernetes",
      "k8s"
    ],

    "SQL": [
      "sql"
    ],

    "REST API": [
      "rest api",
      "restful api",
      "restful"
    ],

    "Bootstrap": [
      "bootstrap"
    ],

    "Tailwind CSS": [
      "tailwind",
      "tailwind css"
    ],

    "Next.js": [
      "next.js",
      "nextjs"
    ],

    "Figma": [
      "figma"
    ]

  };


  // ==========================================
  // DETECT SKILLS
  // ==========================================

  const skills = [];


  for (
    const [skill, patterns]
    of Object.entries(skillPatterns)
  ) {

    const found =
      patterns.some(
        (pattern) => {

          const escaped =
            pattern.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            );


          const regex =
            new RegExp(
              `(^|[^a-z0-9+#])${escaped}([^a-z0-9+#]|$)`,
              "i"
            );


          return regex.test(text);

        }
      );


    if (found) {

      skills.push(skill);

    }

  }


  console.log(
    "Detected Skills:",
    skills
  );


  // ==========================================
  // CATEGORY ANALYSIS
  // ==========================================

  const categoryAnalysis = {};


  const frontendSkills =
    skills.filter(
      skill =>
        [
          "HTML",
          "CSS",
          "JavaScript",
          "TypeScript",
          "React",
          "Bootstrap",
          "Tailwind CSS",
          "Next.js"
        ].includes(skill)
    );


  const backendSkills =
    skills.filter(
      skill =>
        [
          "Node.js",
          "Express",
          "Python",
          "Java",
          "C++",
          "REST API"
        ].includes(skill)
    );


  const databaseSkills =
    skills.filter(
      skill =>
        [
          "MongoDB",
          "MySQL",
          "SQL"
        ].includes(skill)
    );


  const devopsSkills =
    skills.filter(
      skill =>
        [
          "Git",
          "GitHub",
          "Docker",
          "Kubernetes",
          "AWS"
        ].includes(skill)
    );


  const aiSkills =
    skills.filter(
      skill =>
        [
          "Artificial Intelligence",
          "Machine Learning"
        ].includes(skill)
    );


  const designSkills =
    skills.filter(
      skill =>
        [
          "Figma"
        ].includes(skill)
    );


  if (frontendSkills.length) {

    categoryAnalysis.Frontend =
      frontendSkills;

  }


  if (backendSkills.length) {

    categoryAnalysis.Backend =
      backendSkills;

  }


  if (databaseSkills.length) {

    categoryAnalysis.Database =
      databaseSkills;

  }


  if (devopsSkills.length) {

    categoryAnalysis.DevOps =
      devopsSkills;

  }


  if (aiSkills.length) {

    categoryAnalysis.AI =
      aiSkills;

  }


  if (designSkills.length) {

    categoryAnalysis.Design =
      designSkills;

  }


  // ==========================================
  // ATS SCORE
  // ==========================================

  let atsScore = 35;


  if (skills.length >= 3) {

    atsScore += 10;

  }


  if (skills.length >= 6) {

    atsScore += 10;

  }


  if (skills.length >= 10) {

    atsScore += 5;

  }


  if (
    text.includes("project") ||
    text.includes("projects")
  ) {

    atsScore += 10;

  }


  if (
    text.includes("education") ||
    text.includes("degree") ||
    text.includes("bachelor") ||
    text.includes("master")
  ) {

    atsScore += 5;

  }


  if (
    text.includes("experience") ||
    text.includes("internship") ||
    text.includes("work experience")
  ) {

    atsScore += 5;

  }


  if (
    text.includes("github") ||
    text.includes("git hub")
  ) {

    atsScore += 5;

  }


  if (
    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i
      .test(resumeText)
  ) {

    atsScore += 5;

  }


  if (
    text.includes("phone") ||
    text.includes("mobile") ||
    /\b\d{10}\b/.test(text)
  ) {

    atsScore += 5;

  }


  if (atsScore > 100) {

    atsScore = 100;

  }


  // ==========================================
  // SUMMARY
  // ==========================================

  const summary =
    `AI detected ${skills.length} technical skills from your resume.`;


  // ==========================================
  // STRENGTHS
  // ==========================================

  const strengths = [];


  if (skills.length >= 5) {

    strengths.push(
      "Good technical skill coverage"
    );

  }


  if (text.includes("project")) {

    strengths.push(
      "Project experience included"
    );

  }


  if (
    text.includes("github") ||
    text.includes("git hub")
  ) {

    strengths.push(
      "GitHub portfolio included"
    );

  }


  if (
    text.includes("experience") ||
    text.includes("internship")
  ) {

    strengths.push(
      "Professional experience included"
    );

  }


  if (
    text.includes("education") ||
    text.includes("degree") ||
    text.includes("bachelor")
  ) {

    strengths.push(
      "Education information included"
    );

  }


  // ==========================================
  // WEAKNESSES
  // ==========================================

  const weaknesses = [];


  if (!text.includes("project")) {

    weaknesses.push(
      "Add detailed project descriptions"
    );

  }


  if (
    !text.includes("github") &&
    !text.includes("git hub")
  ) {

    weaknesses.push(
      "Add a GitHub portfolio link"
    );

  }


  if (!text.includes("achievement")) {

    weaknesses.push(
      "Add measurable achievements"
    );

  }


  if (!text.includes("certification")) {

    weaknesses.push(
      "Consider adding relevant certifications"
    );

  }


  if (skills.length < 5) {

    weaknesses.push(
      "Add more relevant technical skills"
    );

  }


  // ==========================================
  // CAREER SUGGESTIONS
  // ==========================================

  const careerSuggestions = [];


  if (
    skills.includes("HTML") ||
    skills.includes("CSS") ||
    skills.includes("JavaScript") ||
    skills.includes("TypeScript") ||
    skills.includes("React")
  ) {

    careerSuggestions.push(
      "Frontend Developer"
    );

  }


  if (
    skills.includes("Node.js") ||
    skills.includes("Express") ||
    skills.includes("MongoDB")
  ) {

    careerSuggestions.push(
      "Full Stack Developer"
    );

  }


  if (
    skills.includes("Python") ||
    skills.includes("Artificial Intelligence") ||
    skills.includes("Machine Learning")
  ) {

    careerSuggestions.push(
      "AI / Machine Learning Engineer"
    );

  }


  if (
    skills.includes("AWS") ||
    skills.includes("Docker") ||
    skills.includes("Kubernetes")
  ) {

    careerSuggestions.push(
      "Cloud / DevOps Engineer"
    );

  }


  if (
    skills.includes("Figma")
  ) {

    careerSuggestions.push(
      "UI/UX Designer"
    );

  }


  // ==========================================
  // RECOMMENDATIONS
  // ==========================================

  const recommendations = [

    "Improve project descriptions",

    "Add measurable achievements",

    "Add GitHub portfolio link",

    "Learn advanced cloud technologies",

    "Improve ATS keywords"

  ];


  // ==========================================
  // FINAL RESULT
  // ==========================================

  return {

    atsScore,

    skills,

    categoryAnalysis,

    summary,

    strengths,

    weaknesses,

    careerSuggestions,

    recommendations

  };

};