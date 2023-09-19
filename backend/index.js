//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();


app.use(
    cors({
      origin: process.env.FRONTEND,
      credentials: true,
    })
  );
  app.use(express.json());
  
  const PORT = process.env.PORT || 8080;
  
  app.use(bodyParser.urlencoded({ extended: true }));

  main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}
const UserSchema = new mongoose.Schema(
  {
    Useremail:String,
    name:String,
    email:String,
    phone:String,
    insta:String,
    youtube:String
  }

);


const User = mongoose.model("User", UserSchema);

app.post("/newuser",(req,res)=>{
    console.log(req.body);
    const newUser=new User({
        Useremail:req.body.Useremail,
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    insta:req.body.insta,
    youtube:req.body.youtube
    });

    newUser.save().then((data)=>{
        res.send({alert:true,message:"User Profile Created",result:data});
    }).catch((err)=>{
        console.log(err);
    })
});

app.get("/getUser",(req,res)=>{
const Useremail=req.query.email;
console.log(Useremail,"email value");

User.findOne({
    Useremail:Useremail}).then((data)=>{
    console.log(data);
    res.send({alert:true,result:data})
}).catch((err)=>{
    console.log(err);
})
})



app.listen(PORT, () => {
    console.log("Server running on port 8080");
  });
  