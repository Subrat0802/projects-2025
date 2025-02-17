const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5,
	},
});


//a function to send mail

async function sendVarificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verifiaction Email from COURSE WEB ", otp);
        console.log("Email send succesfully", mailResponse);
    }
    catch(error){
        console.log("error occured while sending mails", error.message);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVarificationEmail(this.email, this.otp);
    next();
})



module.exports = mongoose.model("OTP", OTPSchema);