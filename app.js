const express = require('express');
const app = express();
const sql = require('mysql');
const sendEmail = require('./utils/sendEmail');
require('dotenv').config();

//connect db
const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sample'
});

db.connect((err) => {
    if (err) {
        console.log(`Error in DB ${err}`)
    }
    console.log('Sql connected !!!');
});

//create db
// app.get('/create-db',(req,res)=>{
//     let sql = 'CREATE DATABASE Sample';
//     db.query(sql,(err,result)=>{
//         if(err){
//             console.log(`Error in creating DB ${err}`);
//         }
//         res.send('DB created !!!');
//     });
// });
app.use(express.json());
//insert data
app.get('/add-post', (req, res) => {
    let sql = 'insert into sample set ?';
    let query = db.query(sql, req.body, async (err, result) => {
        if (err) {
            throw err;
        }

        // sending mail
        const message = `Name : ${req.body.name} \n\nProject_Details:${req.body.project_brief}`

        try {
            await sendEmail({
                email: 'mjh409780@gmail.com',
                subject: 'Email Notification',
                message
            });
            res.status(200).json({ success: true, data: 'Email Sent' })
        } catch (error) {
            console.log(error);
        }

        res.json('Post Added !');
    })
});

//create table
// app.get('/create-post-table',(req,res)=>{
//     let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
//     db.query(sql,(err,result)=>{
//         if(err){
//             console.log(`Error in creating table ${err}`);
//         }
//         console.log(result);
//         res.send('DB created !!!');
//     });

// });

app.listen(4000, () => {
    console.log('running.......');
}
)