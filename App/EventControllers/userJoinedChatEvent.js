export default (data, setState) => {
  setState((prevState) => {
    const {
      _id, creator, chatId, text, time, user,
    } = data;

    return {
      chats: {
        ...prevState.chats,
        [chatId]: {
          ...prevState.chats[chatId],
          users: [...prevState.chats[chatId].users, { userId: user.id, userName: user.name }],
          messages: [...prevState.chats[chatId].messages, {
            _id, creator, text, time,
          }],
        },
      },
    };
  });
};

