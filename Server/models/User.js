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
            console.log('error', error.message);
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
    userId: _id,
    email,
    name,
    subscribedTo,
    chatsData: {},
    availableChats: {},
  };
  const userChats = [];
  userObject.ChatRooms.forEach((chat) => {
    dataToSend.chatsData[chat.chatId] = {};
    userChats.push(chat.chatId);
  });

  const availableChatsPromise = ChatRoom.find({
    group: { $in: subscribedTo },
    _id: { $nin: userChats },
  });
  // refactor this shit with async - await
  const chatsPromise = ChatRoom.find({ _id: { $in: userChats } });
  const messagesPromise = Message.find({ chatId: { $in: userChats } });

  return Promise.all([chatsPromise, availableChatsPromise, messagesPromise])
    .then((results) => {
      let [chats, availableChats, messages] = results;

      chats = chats.map(chat => chat.toObject());
      availableChats = availableChats.map(chat => chat.toObject())
        .filter(chat => chat.users.length <= chat.maxNumOfUsers);
      messages = messages.map(message => message.toObject());

      chats.forEach((chat) => {
        // pull stupid __v and _id from chat
        const { __v, _id, ...chatData } = chat;
        chatData.users.forEach((user, i) => {
        // pull embeded document _id
          const { _id, ...userData } = user;
          chatData.users[i] = userData;
        });
        let chatMessages = [];

        messages = messages.filter((message) => {
          if (message.chatId.toHexString() == chat._id.toHexString()) {
            chatMessages.push(message);
            return false;
          }
          return true;
        });
        chatMessages = chatMessages.map((message) => {
          const { __v, chatId, ...messageData } = message;
          messageData.time = message._id.getTimestamp().toString();
          return messageData;
        });

        dataToSend.chatsData[chat._id] = {
          ...chatData,
          messages: chatMessages,
        };
      });
      availableChats = availableChats.map((chat) => {
        // pull stupid __v and _id from chat

        const { __v, users, ...chatData } = chat;

        const [creator] = users
          .filter(user => user.userId.toHexString() === chat.creator.toHexString());
        debugger;
        const { _id, ...creatorData } = creator;
        chatData.creator = creatorData;
        chatData.createdAt = chatData._id.getTimestamp();
        chatData.spotsLeft = chatData.maxNumOfUsers - users.length;
        return chatData;
      });
      dataToSend.availableChats = availableChats;
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
