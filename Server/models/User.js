const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
    isCreator: {
      type: Boolean,
      required: true,
    },
  }],
});

// UserSchema.methods.toJSON = function () {
//   let user = this;
//   let userObject = user.toObject();
//   //find all chat data , including unseen messages
//   const _id = userObject._id;
//   const email = userObject.email;
//   return {_id,email};
// };

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
      bcrypt.compare(password, user.password, (err) => {
        if (!err) {
          // find all info about user(all chats and messages)
          resolve(user);
        } else {
          reject();
        }
      });
    });
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
