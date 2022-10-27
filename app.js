const express = require('express');
const app = express();
const sql = require('mysql');
const sendEmail = require('./utils/sendEmail');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
//connect db
connectDB();
// const db = sql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });

// db.connect((err) => {
//     if (err) {
//         console.log(`Error in DB ${err}`)
//     }
//     console.log('Sql connected !!!');
// });

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://webgrafart.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
//insert data
// app.post('/add-post', (req, res) => {
//     let sql = 'insert into sample set ?';
//     let query = db.query(sql, req.body, async (err, result) => {
//         if (err) {
//             throw err;
//         }

//         // sending mail
//         const message = `Name : ${req.body.name} \n\nProject_Details:${req.body.project_brief}`

//         try {
//             await sendEmail({
//                 email: 'mjh409780@gmail.com',
//                 subject: 'Email Notification',
//                 message
//             });
//             // res.status(200).json({ success: true, data: 'Email Sent' })
//         } catch (error) {
//             console.log(error);
//         }

//         res.json('Post Added !');
//     })
// });

//webgrafartdesign@gmail.com   mjsjiiyjjimcymah
//DB Connect 
app.use('/add-post', require('./routes/data'));

app.get('/', (req, res) => {
    res.send("API running...")
})


app.listen(8000, () => {
    console.log('running.......');
}
)