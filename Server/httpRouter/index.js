const express = require('express');
const router = express.Router();

const loginRouter = require('./login');
const registerRouter = require('./register');
const authRouter = require('./auth');
router.use('/login',loginRouter);
router.use('/register',registerRouter);
router.use('/auth',authRouter);
module.exports = router;