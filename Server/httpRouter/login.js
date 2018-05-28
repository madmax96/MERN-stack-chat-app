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
    .then(user => user.generateAuthToken()
      .then((token) => {
        res.header('x-auth', token).send(user);
      })).catch(() => {
      res.status(400).send();
    });
});

module.exports = router;
