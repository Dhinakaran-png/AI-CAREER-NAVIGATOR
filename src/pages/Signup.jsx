import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth";


function Signup(){


  const navigate = useNavigate();


  const [formData,setFormData] = useState({

    name:"",
    email:"",
    password:""

  });



  const [message,setMessage] = useState("");




  const handleChange = (e)=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });


  };






  const handleSubmit = async(e)=>{


    e.preventDefault();



    const result = await registerUser(formData);



    if(result.success){


      setMessage(
        "Registration successful"
      );


      setTimeout(()=>{


        navigate("/login");


      },1500);



    }else{


      setMessage(

        result.data.message

      );


    }


  };





  return(


    <div className="auth-shell">


      <div className="auth-card">



        <h1>
          Create Account
        </h1>



        <p>
          Join AI Career Navigator
        </p>




        <form onSubmit={handleSubmit}>


          <input

            type="text"

            name="name"

            placeholder="Full Name"

            value={formData.name}

            onChange={handleChange}

          />




          <input

            type="email"

            name="email"

            placeholder="Email Address"

            value={formData.email}

            onChange={handleChange}

          />





          <input

            type="password"

            name="password"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

          />





          <button type="submit">

            Signup

          </button>



        </form>




        {
          message && (

            <p className="message">

              {message}

            </p>

          )
        }





        <p>

          Already have account?

          <Link to="/login">

            Login

          </Link>


        </p>




      </div>



    </div>


  );


}



export default Signup;