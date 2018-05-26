const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to Database');
}).catch((e) => {
  console.log('Database connection error', e.message);
});
module.exports = { mongoose };
