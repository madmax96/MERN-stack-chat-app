export default (data, setState) => {
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
