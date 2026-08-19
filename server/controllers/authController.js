import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// ================= REGISTER USER =================


export const registerUser = async (req,res)=>{


  try{


    const {
      name,
      email,
      password
    } = req.body;



    if(!name || !email || !password){

      return res.status(400).json({

        message:"All fields are required"

      });

    }




    const existingUser = await User.findOne({

      email:email.toLowerCase()

    });



    if(existingUser){


      return res.status(400).json({

        message:"User already exists"

      });


    }





    const hashedPassword = await bcrypt.hash(

      password,

      10

    );





    const user = await User.create({

      name,

      email:email.toLowerCase(),

      password:hashedPassword

    });






    res.status(201).json({

      message:"Registration successful",

      user:{

        id:user._id,

        name:user.name,

        email:user.email

      }

    });




  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};








// ================= LOGIN USER =================


export const loginUser = async(req,res)=>{


  try{


    const {

      email,

      password

    } = req.body;





    if(!email || !password){


      return res.status(400).json({

        message:"Email and password required"

      });


    }






    const user = await User.findOne({

      email:email.toLowerCase()

    });





    if(!user){


      return res.status(404).json({

        message:"User not found"

      });


    }





    const passwordMatch = await bcrypt.compare(

      password,

      user.password

    );





    if(!passwordMatch){


      return res.status(400).json({

        message:"Invalid password"

      });


    }






    const token = jwt.sign(


      {

        id:user._id

      },


      process.env.JWT_SECRET,


      {

        expiresIn:"7d"

      }


    );






    res.status(200).json({


      message:"Login successful",



      token,



      user:{


        id:user._id,

        name:user.name,

        email:user.email


      }



    });






  }catch(error){



    res.status(500).json({

      message:error.message

    });



  }



};