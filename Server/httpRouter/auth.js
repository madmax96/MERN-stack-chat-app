const express = require('express');
const User = require('../models/User');

const router = express.Router();
router.get('/', (req, res) => {
  const token = req.headers['x-auth'];
  User.findByToken(token).then((user) => {
    if (!user) {
      res.status(404);
    } else {
      return User.getUserData(user.toObject()).then((dataToSend) => {
        res.send(dataToSend);
      });
    }
  }).catch(() => {
    res.status(400).send();
  });
});

module.exports = router;
