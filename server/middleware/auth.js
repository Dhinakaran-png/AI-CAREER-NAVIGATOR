import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        success: false,
        message: "Not authorized. Token missing."
      });

    }


    const token =
      authHeader.split(" ")[1];


    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );


    const user =
      await User.findById(decoded.id)
        .select("-password");


    if (!user) {

      return res.status(401).json({
        success: false,
        message: "User not found"
      });

    }


    req.user = user;

    next();

  } catch (error) {

    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });

  }

};

export default protect;