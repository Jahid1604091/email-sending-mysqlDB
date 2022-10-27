const express = require('express')
const router = express.Router()
const Data = require('../models/Data')
const sendEmail = require('../utils/sendEmail')


router.post('/', (req, res) => {

    const data = new Data(req.body)

    data.save(async(err, d) => {
        if (err) {
            return res.status(400).json({
                message: 'Something went wrong!'
            })
        }
        else {
            // sending mail
            const message = `Name : ${req.body.name} \n\nProject_Details:${req.body.project_brief}`

            try {
                await sendEmail({
                    email: process.env.SMTP_EMAIL,
                    subject: 'Email Notification',
                    message
                });
                // res.status(200).json({ success: true, data: 'Email Sent' })
            } catch (error) {
                console.log(error);
            }

            res.json('Post Added !');
        }
    })

})

module.exports = router