const mongoose = require("mongoose");
require("dotnev").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        newUrlParser:true,
        newUnifiedTopology:true
    })
    .then(() => {
        console.log("DATABASE connected")
    }).catch((error) => {
        console.log("DB connection failed")
        console.log(error)
        process.exit(1);
    })
}