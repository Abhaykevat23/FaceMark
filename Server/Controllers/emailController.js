// const expressAsyncHandler = require("express-async-handler");
// const dotenv = require("dotenv");
// const nodemailer = require("nodemailer");
// dotenv.config();


// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST ,
//     port: 465 ,
//     secure: true, // Use `true` for port 465, `false` for all other ports
//     auth: {
//         user: process.env.SMTP_MAIL,
//         pass: process.env.SMTP_PASS,
//     },
// });

// const sendEmail = expressAsyncHandler(async (req, res) => {
//     const { email,subject,message ,attachment } = req.body;
//     // console.log(email , subject , message );

//     var mailOptions={
//         from : process.env.SMTP_MAIL,
//         to : email,
//         subject : subject ,
//         html : "<H3>" + message + "</H3>" ,
//         attachments : [{
//             filename:attachment,
//             path:"C:/Users/Admin/Downloads/" + attachment,
//         }]
//     }

//     transporter.sendMail(mailOptions,function(error,info){
//         if (error) {
//             console.log(error);
//         }
//         else{
//             res.json({message:"Email Sent Successfully."});
//         }
//     })
// })

// module.exports = { sendEmail };