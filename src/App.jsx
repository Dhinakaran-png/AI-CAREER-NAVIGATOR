import React from "react";

import {
  Routes,
  Route
} from "react-router-dom";


import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Resume from "./pages/Resume";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";



function App(){


return(


<>


<Navbar/>



<Routes>


{/* PUBLIC ROUTES */}


<Route
path="/"
element={<Home/>}
/>



<Route
path="/login"
element={<Login/>}
/>



<Route
path="/signup"
element={<Signup/>}
/>



<Route
  path="/resume-analysis"
  element={<ResumeAnalysis />}
/>





{/* PROTECTED ROUTES */}



<Route

path="/resume"

element={

<ProtectedRoute>

<Resume/>

</ProtectedRoute>

}

/>





<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard/>

</ProtectedRoute>

}

/>



</Routes>




</>


)


}


export default App;