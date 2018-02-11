const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/',(req,res)=>{
   const token = req.headers['x-auth'];
  User.findByToken(token).then((user) => {
    if(!user){
        res.status(404);
    }else{
        res.send(user);
    }
  }).catch((e) => { 
    res.status(400).send();
  });
}); 

module.exports = router;