//INSERT

function insertPost(req,res,connection) {
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
}


//READ

function readPost(req,res,connection) {
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
}

//DELETE
function deletePost(req,res,connection) {
    const {id} = req.params ;

    try {
        connection.query(
            "DELETE post WHERE ",
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
}
module.exports = {insertPost, readPost} ;

