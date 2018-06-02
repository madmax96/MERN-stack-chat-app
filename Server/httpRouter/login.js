const express = require('express');

const router = express.Router();
const User = require('../models/User');


router.post('/', (req, res) => {
  const { email = false, password = false } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400);
    return;
  }
  User.findByCredentials(email, password)
    .then(({ user, dataToSend }) => user.generateAuthToken()
      .then((token) => {
      /* Sends:
        subscribedTo:[]
        id:ObjectID,
        name:String,
        email:String,
        roomsData:{
          'chatId':{
            id:ObjectID,
            creator:ObjectID,
            group:String,
            title:String,
            maxNumOfUsers:String,
            users:[{userId:ObjecId
                    ,userName:String}]
            messages:[{
              id:String,
              creator:ObjectID,
              chatId:ObjectId,
              text:String,
              time:String
            }],

          }
        }

      */

        res.header('x-auth', token).send(dataToSend);
      })).catch(() => {
      res.status(400).send();
    });
});

module.exports = router;
