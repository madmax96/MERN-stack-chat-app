const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  name:{
      type:String,
      required:true,
      trim: true
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  personalChats:[{
    chat :{
        required:false,
        type:mongoose.Schema.Types.ObjectId
    }
  }],
  otherChats:[{
    chat :{
        required:false,
        type:mongoose.Schema.Types.ObjectId
    }
  }],
  subscribedTo:{
      type:[String],
      required:false,
      enum:['Sport','Celebrity','Politics','Movies','Songs']
  }
});

// UserSchema.methods.toJSON = function () {
//   let user = this;
//   let userObject = user.toObject();
//   const _id = userObject._id;
//   const email = userObject.email;
//   return {_id,email};
// };

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString()}, process.env.JWT_SECRET).toString();

  user.tokens.push({token});
  return user.save().then(() => {
    return token;
  });
};


UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
   
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};


UserSchema.pre('save',function(next){
  let user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = User
