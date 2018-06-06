const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ChatRoom = require('./ChatRoom');
const Message = require('./Message');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  tokens: {
    type: [String],
  },
  subscribedTo: {
    type: [String],
    enum: ['Sport', 'Celebrity', 'Politics', 'Movies', 'Songs'],
  },
  ChatRooms: [{
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  }],
});

UserSchema.methods.generateAuthToken = function generateAuthToken() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET).toString();
  user.tokens.push(token);
  return user.save().then(() => token);
};


UserSchema.statics.findByToken = function findByToken(token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    tokens: token,
  });
};

UserSchema.statics.findByCredentials = function findByCredentials(email, password) {
  const User = this;

  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // find all info about user(all chats and messages)
          let userObject = user.toObject();

          User.getUserData(userObject).then((dataToSend) => {
            // i need user Model object becaouse of getToken  method
            userObject = {
              user,
              dataToSend,
            };
            resolve(userObject);
          }).catch((error) => {
            reject(error);
          });
        } else {
          reject();
        }
      });
    });
  });
};


UserSchema.statics.getUserData = function getUserData(userObject) {
  const {
    email, name, subscribedTo, _id,
  } = userObject;
  const dataToSend = {
    id: _id,
    email,
    name,
    subscribedTo,
    roomsData: {},
  };

  userObject.ChatRooms.forEach((room) => {
    dataToSend.roomsData[room.chatId] = {};
  });
  // refactor this shit with async - await
  const chatPromises = [];
  const messagePromises = [];
  userObject.ChatRooms.forEach((chatRoom) => {
    const chatPromise = ChatRoom.findById(chatRoom.chatId);
    const messagePromise = Message.find({ chatId: chatRoom.chatId });
    chatPromises.push(chatPromise);
    messagePromises.push(messagePromise);
  });
  return Promise.all(chatPromises).then((results) => {
    results.forEach((chat) => {
      chat = chat.toObject();
      // pull stupid __v from chat
      const { __v, ...chatData } = chat;
      chatData.users.forEach((user, i) => {
        // pull embeded document _id which i dont need
        const { _id, ...userData } = user;
        chatData.users[i] = userData;
      });
      dataToSend.roomsData[chat._id] = {
        ...chatData,
        messages: [],
      };
    });
    return Promise.all(messagePromises);
  }).then((results) => {
    results.forEach((result) => {
      result.forEach((message) => {
        message = message.toObject();
        const { __v, chatId, ...messageData } = message;
        messageData.time = message._id.getTimestamp().toString();
        dataToSend.roomsData[chatId].messages.push(messageData);
      });
    });
    return dataToSend;
  });
};

UserSchema.methods.removeToken = function removeToken(token) {
  const user = this;

  return user.update({
    $pull: {
      tokens: token,
    },
  });
};

UserSchema.pre('save', function preSave(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
