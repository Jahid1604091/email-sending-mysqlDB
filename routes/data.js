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
            const message = `<div> <img src='http://webgrafart.com/grafart%202-01.png' width='80' height='50'/>
            <h3 style='color:indigo; border-bottom:1px solid indigo'>You have a notification</h3> \n\n
            <div style='text-align:start;'>
            
            \n<p> <strong>Name</strong> :  ${req.body.name} </p>
            \n<p><strong>Email</strong>  : ${req.body.email} </p>
            \<p><strong>City</strong>  :  ${req.body.city}</p>
            \n<p><strong>Budget</strong>  : : ${req.body.budget} </p>
            \n<p><strong>Project Details</strong>  :  ${req.body.project_brief}</p>
            </div>
            </div>
            `

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