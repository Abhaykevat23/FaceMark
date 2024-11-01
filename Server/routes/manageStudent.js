const express = require('express');
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');

let success = true;
const path = require("path");

// Route 1 : create Student ====================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "D:/Mini Project/FaceMark/Server/studentImages/");
    }
});

const upload = multer({ storage: storage });

router.post('/addstudent', upload.single("stud_image"), [
    body('stud_name', 'Enter Valid name').notEmpty(),
    body('stud_class', 'Enter Valid class').notEmpty(),
    body('roll_no', 'Please write number').notEmpty(),
    body('enrollment_no', 'Please write number').notEmpty(),
], async (req, res) => {

    // if there are errors then send bad request error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }
    // check user with this number student exist or not
    try {
        let student = await Student.findOne({ enrollment_number: req.body.enrollment_no });

        if (student) {
            success = false;
            return res.status(400).json({ success, error: "Sorry with this Enrollment Number student already exist..." });
        }
        // const newFilename = req.body.enrollment_no;
        const ext = path.extname(req.file.originalname);
        const newFilename = `${req.body.enrollment_no}${ext}`;
        const destination = path.join("D:/Mini Project/FaceMark/Server/studentImages", newFilename);
        await fs.promises.rename(req.file.path, destination);

        student = await Student.create({
            student_class: req.body.stud_class,
            student_name: req.body.stud_name,
            roll_number: req.body.roll_no,
            enrollment_number: req.body.enrollment_no,
            student_image: req.body.enrollment_no,
        });
        const data = {
            student: {
                id: student.id,
            }
        }
        success = true;
        res.json({ success, message: "Student Added successfully!", imageName: newFilename });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// Route 2 : Display Student ====================================

router.post('/displaystudents', async (req, res) => {
    const { instructorClass } = req.body;
    try {
        const student = await Student.find({ student_class: instructorClass });
        res.json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router