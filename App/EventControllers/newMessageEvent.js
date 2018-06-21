export default (data, setState) => {
  console.log('received', data);
  //   _id: "5b2b89e57da898381c3e0d1f"
  //
  // chatId: "5b2b88f989e6f137f809e429"
  //
  // creator: "5b2b88f989e6f137f809e426"
  //
  // text: "testing message"
  //
  // time: "2018-06-21T11:20:05.000Z"
  setState((prevState) => {
    const {
      _id, creator, chatId, text, time,
    } = data;
    return {
      chats: {
        ...prevState.chats,
        [chatId]: {
          ...prevState.chats[chatId],
          messages: [...prevState.chats[chatId].messages, {
            _id, creator, text, time,
          }],
        },
      },
    };
  });
};
