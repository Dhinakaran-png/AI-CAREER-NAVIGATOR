import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";


function Navbar(){


  const navigate = useNavigate();


  const token = localStorage.getItem("token");



  const logout = ()=>{


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    navigate("/login");


  };




  return(


    <nav className="navbar">



      <div className="nav-logo">


        <Link to="/">

          AI Career Navigator

        </Link>


      </div>







      <div className="nav-menu">





        <NavLink to="/">

          Home

        </NavLink>







        {
          token &&

          <NavLink to="/resume">

            Resume

          </NavLink>

        }
        {
          token &&

          <NavLink to="/resume-analysis">

            ResumeAnalysis
          </NavLink>

        }


        







        {
          token &&

          <NavLink to="/dashboard">

            Dashboard

          </NavLink>

          

        }
         






        {

          token ?


          <button

            className="logout-btn"

            onClick={logout}

          >

            Logout

          </button>



          :


          <>


          <NavLink to="/login">

            Login

          </NavLink>



          <NavLink to="/signup">

            Signup

          </NavLink>


          </>


        }





      </div>





    </nav>


  );

}



export default Navbar;