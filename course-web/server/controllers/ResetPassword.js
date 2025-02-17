const User = require("../models/User");
const mailSender = require("../utils/mailSender");

//reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const email = req.body.email;
    //check user for this email, email validation
    const user = await user.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Youe rmail is not registered with us",
      });
    }
    //genearte token
    const token = crypto.randomUUID();
    //update usr by adding token and expiration time
    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    //create url
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail containing the url
    await mailSender(
      email,
      "Password reset link",
      `Password reset link: ${url}`
    );
    //return response
    return res.status(200).json({
      success: true,
      message:
        "Please check your email, we have sended you reset password link",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Something went wrong while sending reset password link to email.",
      sucsess: false,
    });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  try {
    //daat fetch
    const { password, confirmPassword, token } = req.body;
    //validation
    if (password !== confirmPassword) {
      return res.status(409).json({
        success: false,
        message: "Password does not matching",
      });
    }

    //get userdetails
    const userDetails = await User.findOne({ token: token });

    //if no entry invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }
    //token time check
    if (userDetails.resetpasswordExpires < Date.now()) {
      return res.status(404).json({
        message: "Token is expired please re genrate link",
        success: false,
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //password update
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    //return res
    return res.status(200).json({
      message: "password updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something went wrong while changing password",
      success: false,
    });
  }
};
