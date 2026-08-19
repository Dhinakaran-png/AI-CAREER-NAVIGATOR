import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const parseResume = async (filePath) => {

  const extension = path
    .extname(filePath)
    .toLowerCase();

  const fileBuffer = fs.readFileSync(filePath);

  let text = "";

  if (extension === ".pdf") {

    const data = await pdfParse(fileBuffer);

    text = data.text;

  } else if (extension === ".docx") {

    const result = await mammoth.extractRawText({
      buffer: fileBuffer
    });

    text = result.value;

  } else {

    throw new Error(
      "Only PDF and DOCX resumes are supported"
    );

  }

  return text.trim();
};

export default parseResume;