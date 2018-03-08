const express = require('express');
const User = require('../models/User');

const router = express.Router();
router.get('/', (req, res) => {
  const token = req.headers['x-auth'];
  User.findByToken(token).then((user) => {
    if (!user) {
      res.status(404);
    } else {
      res.send(user);
    }
  }).catch(() => {
    res.status(400).send();
  });
});

module.exports = router;
