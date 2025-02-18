const OTP = require("../models/OTP");
const User = require("../models/User");
const otpgenrator = require("otp-genrator");
const {
  userSignUpZodSchema,
  userSignInZodSchema,
} = require("../utils/zodAuth");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const { ZodError } = require("zod");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();



//sendotp
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(409).json({
        success: false,
        message: "user is already registered",
      });
    }

    //generate otp
    var otp = otpgenrator.generate(6, {
      upperCaseAlphabet: false,
      lowercaseAlphabet: false,
      specialChars: false,
    });

    consoel.log("otp", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpgenrator.generate(6, {
        upperCaseAlphabet: false,
        lowercaseAlphabet: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    //create an entery in OTP
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({
      message: "Server error, while sending otp",
      success: false,
    });
  }
};



//signup
exports.signUp = async (req, res) => {
  try {
    const validationSignUp = await userSignUpZodSchema.parseAsync(req.body);
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      confirmPassword,
      accountType,
      otp,
    } = validationSignUp;

    if (password !== confirmPassword) {
      return res.status(409).json({
        message: "You password does not match, please try again.",
        success: false,
      });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(409).json({
        message:
          "User is already present, please try with different email address",
      });
    }

    //find most recent otp for the user
    const recentOtp = await OTP.find({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    if (recentOtp.otp.length === 0) {
      return res.status(404).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(404).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.sign(password, 10);

    const profileRes = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const response = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}-${lastName}`,
      additionalDetails: profileRes._id,
    });

    if (!response) {
      res.status(404).json({
        message: "Error while creating user, please try again",
        success: false,
      });
    }

    res.status(200).json({
      message: "User is created successfully",
      data: response,
      success: true,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(408).json({
        message: "Validation Error",
        error: error.errors,
      });
    } else if (error.name === "TimeoutError") {
      res.status(404).json({
        message: "Request timeout, please try again later",
      });
    } else {
      res.status(500).json({
        message: "Internal server error, signup again or after sometime",
        error: error.errors,
      });
    }
  }
};



//login
exports.login = async (req, res) => {
  try {
    const validationLogin = await userSignInZodSchema.parseAsync(req.body);
    const { email, password } = validationLogin;

    const checkEmailPresent = await User.findOne({ email }).populate("additionalDetails");
    if (!checkEmailPresent) {
      return res.status(409).json({
        message: "Invalid user email, please first signup",
      });
    }

    const passwordValidation = await bcrypt.compare(
      password,
      checkEmailPresent.password
    );
    if (!passwordValidation) {
      return res.status(409).json({
        message: "password is incorrect",
        success: false,
      });
    }

    const token = await jwt.sign(
      {
        email: checkEmailPresent.email,
        id: checkEmailPresent._id,
        accountType: checkEmailPresent.accountType,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    checkEmailPresent.token = token;
    checkEmailPresent.password = undefined;

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 ),
        httpOnly: true
    }

    res.cookie("token", token, options).status(200).json({
      message: "user login successfully",
      success: true,
      response: checkEmailPresent,
      token: token,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: "validation (Zod) error",
        error: error.errors,
      });
    } else if (error.name === "TimeoutError") {
      res.status(404).json({
        message: "Request timeout, please try again later",
      });
    } else {
      res.status(500).json({
        message: "Internal server error, signup again or after sometime",
        error: error.errors,
      });
    }
  }
};



//changepassword
exports.chengePassword = async (req, res) => {
    try{
        //get data from req
        //get old new conf pass
        //validation

        //update pwd in db
        // send mail
        //return response

    }catch(error){

    }
}