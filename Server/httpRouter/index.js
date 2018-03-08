const express = require('express');
const loginRouter = require('./login');
const registerRouter = require('./register');
const authRouter = require('./auth');

const router = express.Router();
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/auth', authRouter);
module.exports = router;
