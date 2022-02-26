const mongoose = require("mongoose") 
const Schema = mongoose.Schema 

const userSchema = new Schema({
    name : String,
    gender : String,
    address : String,
    phone : String,
    ward_id : String,
    lga : String,
    state : String
}) 
 
module.exports = mongoose.model('citizen' , userSchema)