const express = require("express");
const route = express.Router();
const {loginUser,regUser,addExp,getExp,deleteExp,updateExp} = require("./models.js");

route.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if(user){
      res.status(200).json({ message: 'Login success' });
    }
  } catch (err) {
    res.status(500).json("Failed");
  }
});

route.post('/register',async(req,res)=>{
  const {name,email,pass} = req.body;
  try{
    const user = await regUser(name,email,pass);
    if(user){
      res.json({message:"Registered succesfully"});
    }
  }catch(err){
    res.status(500).json("Failed");
  }
});


module.exports = route;
