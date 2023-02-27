const express = require("express");
const cors = require("cors");
// require('./database/config');
const dbConnection = require('./database/config.js')
const dotenv = require("dotenv")
const User = require("./database/User");
const app = express();

app.use(express.json());
app.use(cors());



app.get("/",(req, resp)=>{
    resp.send("<h1>This is home page</h1>")
})

app.post("/register", async(req, resp)=>{
    let abc = new User(req.body)
    let result = await abc.save();
    resp.send(result);    
})

app.get("/registerUser",async(req, res)=>{
    let userData = await User.find()
    // let result = userData.json()
    if(userData.length > 0){
        res.send(userData)
    }else{
        res.send({msg: "No user Data found in Database"})
    }
})

app.delete("/user/:id",async(req,resp)=>{
    // resp.send(req.params)
    let user = await User.deleteOne({_id: req.params.id})
    if(user){
        resp.send(user)
    }else{
        resp.send({msg: "No record found"})
    }
})

app.get("/userdetail/:id",async(req,resp)=>{
    let result = await User.findOne({_id: req.params.id})
    if(result){
        resp.send(result)
    }else{
        resp.send({msg: "No user found"})
    }
})

app.put("/userupdate/:id",async(req,resp)=>{
    let data = await User.updateOne(
        {_id: req.params.id},
        {$set: req.body}
    )    
    resp.send(data)
})





PORT = process.env.PORT || 4000

const startServer = () =>{
    try {
        dbConnection();
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT} in ${process.env.MODE}`);
        })
    } catch (error) {
        console.log("Error in connection")
    }
}

startServer();
dotenv.config();

