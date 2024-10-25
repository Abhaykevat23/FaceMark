const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    class:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    user_type: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const User = mongoose.model('user', userSchema);
module.exports = User;