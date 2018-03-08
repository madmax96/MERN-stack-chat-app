const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  chatId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  text: {
    required: true,
    type: String,
    trim: true,
  },
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
