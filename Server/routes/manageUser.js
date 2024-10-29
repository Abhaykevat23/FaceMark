const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var fetchuser = require('../middlewear/fetchuser');

const JWT_SECRET = 'facemark';
let success = true;


// ==================================================Instructor==============================================


// Route 1 : create a instructor ====================================
router.post('/addinstructor', [
    body('email', 'Enter Valid email').isEmail().notEmpty(),
    body('password', 'Enter Valid password').isLength({ min: 4 }),
    body('user_type', 'Please Select User').notEmpty(),
    body('name', 'Please Enter Name').notEmpty(),
    body('class', 'Please Enter class').notEmpty(),
], async (req, res) => {

    // if there are errors then send bad request error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }
    // check user with this email exist or not
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry with this email user already exist..." });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            class :req.body.class,
            name : req.body.name,
            user_type: req.body.user_type,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})




// // ============================================= Student ================================================


// // Route 1 : create Student ====================================
// router.post('/addstudent', [
//     body('stud_name', 'Enter Valid name').notEmpty(),
//     body('stud_class', 'Enter Valid class').notEmpty(),
//     body('roll_no', 'Please write number').notEmpty(),
//     body('enrollment_no', 'Please write number').notEmpty(),
//     body('stud_image', 'Please upload JPG image Only').notEmpty(),
// ], async (req, res) => {

//     // if there are errors then send bad request error message
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//         res.send({ errors: result.array() });
//     }
//     // check user with this email exist or not
//     try {
//         let user = await User.findOne({ email: req.body.email });

//         if (user) {
//             success = false;
//             return res.status(400).json({ success, error: "Sorry with this email user already exist..." });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(req.body.password, salt);

//         user = await User.create({
//             class :req.body.class,
//             name : req.body.name,
//             user_type: req.body.user_type,
//             email: req.body.email,
//             password: secPass,
//         });
//         const data = {
//             user: {
//                 id: user.id,
//             }
//         }
//         const authToken = jwt.sign(data, JWT_SECRET);
//         success = true;
//         res.json({ success, authToken });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error")
//     }
// })

module.exports = router