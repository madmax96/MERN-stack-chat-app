const express = require('express');
const router = express.Router();



router.post('/',(req,res)=>{
    res.send('Login in');

    //login ce proveriti email i password i vratiti token ili gresku i sve  podatke o korisniku
}); 

module.exports = router;