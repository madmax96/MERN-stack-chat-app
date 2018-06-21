
/*
Receive{
    groupName:String,
    subscribe:Boolean
}
broadcast{
}
*/
const User = require('./../models/User');


module.exports = (data, clientSocket) => {
  const { user } = clientSocket;
  const { groupName } = data;

  let updatePromise;
  if (data.subscribe) {
    updatePromise = User.findByIdAndUpdate(user._id, {
      $push: {
        subscribedTo: groupName,
      },
    }, { new: true });
  } else {
    updatePromise = User.findByIdAndUpdate(user._id, {
      $pull: {
        subscribedTo: groupName,
      },
    }, { new: true });
  }

  updatePromise.then(() => {
    // emit subscription confirm event
  });
};
