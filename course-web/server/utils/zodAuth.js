const {z} = require("zod");

exports.userSignUpZodSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    contactNumber:z.number().min(10),
    password: z.string().password().min(3),
    confirmPassword:z.string().password().min(3),
    accountType: z.string(),
    otp:z.number().min(6)
})

exports.userSignInZodSchema = z.object({
    email:z.string().email(),
    password:z.string().password().min(3)
})