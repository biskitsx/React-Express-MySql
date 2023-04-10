const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

//configuration
app.use(express.json());
app.use(cors());

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

    try {22
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


app.patch('/update',(req,res)=>{
    const {message,id} = req.body ;

    try {
        connection.query(
            "UPDATE post SET message = ? WHERE id = ?",
            [message,id],
            (err,result)=>{
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json({message : "update succesfully"});
            }
        )
    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.delete('/delete/:id',(req,res)=>{
    try {
        const id = req.params.id ;
        connection.query(
            "DELETE FROM post WHERE id = ?",
            [id],
            (err,result,fields)=>{
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (result.affectedRows === 0) {
                    res.status(400).json({message: "No user with that ID"});
                }
                return res.status(200).json({message : "User deleted successfully"});
            }
        )
    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})



//Start Server
app.listen(1500,(err)=>{
    if (err)
        throw err;

    console.log("Server start at : http://localhost:1500");
})