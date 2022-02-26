const mongoose = require("mongoose") 
const Schema = mongoose.Schema 

const userSchema = new Schema({
    name : {
        type: String,
        unique: true
    },
    state_id : String,
}) 
 
module.exports = mongoose.model('lga' , userSchema)