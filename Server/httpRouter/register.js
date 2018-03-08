const express = require('express');

const router = express.Router();
const User = require('../models/User');


router.post('/', (req, res) => {
  const { email = false, name = false, password = false } = req.body;

  if (!email || !password || !name) {
    res.status(400).send();
    return;
  }
  new User({ email, name, password }).save().then(() => {
    res.send();
  }).catch((e) => {
    res.status(401).send(e);
  });
});

module.exports = router;
