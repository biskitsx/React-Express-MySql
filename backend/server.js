const express = require('express');
const mysql = require('mysql');
const app = express();
const {insertPost} = require('./qqq');

//configuration
app.use(express.json());

//connect to DataBase
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Todo',
    port: '9999'
})

connection.connect((err)=>{
    if (err) 
        throw err ;
    console.log('Connected Succesfully!');
})


//Create Routes
app.get('/',(req,res)=>{
    res.status(200).send("Hello!");
});

//INSERT
app.post('/insert',(req,res)=>{
    const {message,name} = req.body ;

    try {
        connection.query(
            "INSERT INTO post(message,name) VALUES (?,?)",
            [message,name],
            (err,result)=>{
                if (err) {
                    console.log(err);
                    return res.status(410).send();
                }
                return res.status(201).json({message : 'new user Succesfully inserted'});
            }
        )
    }
    catch(err) {
        console.log(err);
        return res.status(405).send();
    }
})

//READ
app.get('/read',(req,res)=>{
    try {
        connection.query(
            "SELECT * FROM post",
            (err,result)=>{
                if (err) {
                    console.log(err);
                    return res.status(401).send();
                }
                return res.status(201).json(result);
            }
        )
    }
    catch(err) {
        console.log(err);
        return res.status(406).send();
    }
})


//READ SINGLE
app.get('/read/:id',(req,res)=>{
    const {id} = req.params ;
    try {
        connection.query(
            "SELECT * FROM post WHERE id = ?",
            [id],

            (err,result)=>{
                if (err) {
                    console.log(err);
                    return res.status(401).send();
                }
                return res.status(201).json(result);
            }
        )
    }
    catch(err) {
        console.log(err);
        return res.status(406).send();
    }
})

//DELETE
app.delete('/delete',(req,res)=>{
    try {
        connection.query(
            "SELECT * FROM post",
            (err,result)=>{
                if (err) {
                    console.log(err);
                    return res.status(401).send();
                }
                return res.status(201).json(result);
            }
        )
    }
    catch(err) {
        console.log(err);
        return res.status(406).send();
    }
})
//Start Server
app.listen(1500,(err)=>{
    if (err)
        throw err;

    console.log("Server start at : http://localhost:1500");
})