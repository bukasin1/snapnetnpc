const mongoose = require("mongoose") 
const Schema = mongoose.Schema 

const userSchema = new Schema({
    name : String,
    password : String,
    email : {
        type: String,
        unique: true
    },
    admin: Boolean,
}) 
 
module.exports = mongoose.model('user' , userSchema)