const mongoose = require("mongoose") 
const Schema = mongoose.Schema 

const userSchema = new Schema({
    name : {
        type: String,
        unique: true
    },
    lga_id : String,
}) 
 
module.exports = mongoose.model('ward' , userSchema)