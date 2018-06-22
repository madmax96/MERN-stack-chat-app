export default (data, userId, setState) => {
  const {
    group, title, maxNumOfUsers, chatId, creator,
  } = data;
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

