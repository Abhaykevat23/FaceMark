const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var fetchuser = require('../middlewear/fetchuser');

const JWT_SECRET = 'facemark';
let success = true;

// Route 1 : create a user ====================================
// router.post('/createuser', [
//     body('email', 'Enter Valid email').isEmail().notEmpty(),
//     body('password', 'Enter Valid password').isLength({ min: 4 }),
//     body('user', 'Please Select User').isEmpty()
// ], async (req, res) => {

//     // if there are errors then send bad request error message
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//         res.send({ errors: result.array() });
//     }
//     // check user with this email exist or not
//     try {
//         let user = await User.findOne({ email: req.body.email });
//         //, user_type: req.body.user_type ---- add this if you want to add duplicate email for diffrent user

//         if (user) {
//             success = false;
//             return res.status(400).json({ success, error: "Sorry with this email user already exist..." });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(req.body.password, salt);

//         user = await User.create({
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


// Route 2 : authenticate a user =========================
router.post('/login', [
    body('email', 'Enter Valid email').isEmail().notEmpty(),
    body('password', 'Enter Valid password').notEmpty(),
    body('user', 'Please Select User').isEmpty()
], async (req, res) => {

    // if there are errors then send bad request error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }


        const data = {
            user: {
                id: user.id,
            }
        }
        const instructorClass = user.class; 
        const user_type = user.user_type;
        
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authToken, class:instructorClass, user_type });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// // Route 3 : Get Logged In User a user =========================
// router.post('/getuser', fetchuser, async (req, res) => {
//     try {
//         let userId = req.user.id;
//         const user = await User.findById(userId).select('-password');
//         res.send(user);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error")
//     }

// })

// // Route 4 : Change Account Password =========================
// router.post('/changepassword', [
//     body('email', 'Enter Valid email').isEmail().notEmpty(),
//     body('password', 'Enter Valid password').isLength({ min: 4 })
// ], async (req, res) => {

//     // if there are errors then send bad request error message
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//         res.send({ errors: result.array() });
//     }
//     // check user with this email exist or not
//     try {
//         let user = await User.findOne({ email: req.body.email });
//         // if user not exist then send error
//         if (!user) {
//             success = false;
//             return res.status(400).json({ success, error: "Sorry with this email no user exist..." });
//         }
//         else {
//             const salt = await bcrypt.genSalt(10);
//             const secPass = await bcrypt.hash(req.body.password, salt);

//             await User.findOneAndUpdate({
//                 email: req.body.email,
//                 password: secPass,
//             });

//             success = true;
//             res.json({ success});
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error")
//     }
// })

module.exports = router