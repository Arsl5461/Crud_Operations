const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({        

    name: {
        type: String,
        required: true,        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }

    // name: String,
    // email: String,
    // password: String
})

module.exports = mongoose.model("users", userSchema)
//  export const abc = mongoose.model("user" , userSchema)