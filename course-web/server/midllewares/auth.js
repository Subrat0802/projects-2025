const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

///auth
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.header("Authorization").replace("Bearer ", "") ||
      req.body.token ||
      req.cookie.token;

    if(!token){
        return res.status(401).json({
            message:"Token is missing",
            success:false
        })
    }

    const decode = await jwt.verify(token, JWT_SECRET_KEY);

    if (!decode) {
      return res.status(404).json({
        message: "invalid token",
        success: false,
      });
    }

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token error",
    });
  }
};

//isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(404).json({
        message: "This is protected route for Students only.",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Error, while validating student token, server error",
    });
  }
};

//isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (response.accountType !== "Instructor") {
      return res.status(404).json({
        message: "This is protected route for Instructor only.",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Error, while validating instructor token, server error",
    });
  }
};

//isAdmin

exports.isAdmin = async (req, res, next) => {
  try {
    if (response.accountType !== "Admin") {
      return res.status(404).json({
        message: "This is protected route for Admin only.",
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Error, while validating admin token, server error",
    });
  }
};
