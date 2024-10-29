const mongoose = require('mongoose');
const { Schema } = mongoose;
const studentSchema = new Schema({
    student_class:{
        type:String,
        required:true
    },
    student_name:{
        type:String,
        required:true
    },
    roll_number: {
        type: Number,
        required: true
    },
    enrollment_number: {
        type: String,
        required: true,
        unique: true
    },
    student_image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const Student = mongoose.model('student', studentSchema);
module.exports = Student;