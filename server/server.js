import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";


dotenv.config();


const app = express();


// =======================
// DATABASE CONNECTION
// =======================

connectDB();



// =======================
// MIDDLEWARE
// =======================


app.use(
  cors({
    origin:[
      "http://localhost:5173",
      "http://localhost:5174",
       "http://localhost:5175"
    ],
    credentials:true
  })
);


app.use(express.json());



// =======================
// ROUTES
// =======================


app.use(
  "/api/auth",
  authRoutes
);


app.use(
"/api/resume",
resumeRoutes
);



// =======================
// TEST ROUTE
// =======================


app.get("/",(req,res)=>{

  res.status(200).json({

    success:true,

    message:"🚀 AI Career Navigator API Running"

  });

});



// =======================
// SERVER START
// =======================


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

 console.log(
  `✅ Server Running on Port ${PORT}`
 );

});