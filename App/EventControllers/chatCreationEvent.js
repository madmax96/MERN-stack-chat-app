export default (data, setState) => {
  const {
    group, title, maxNumOfUsers, chatId, creator, users,
  } = data;

  setState(prevState => ({
    chats: {
      ...prevState.chats,
      [chatId]: {
        group,
        title,
        maxNumOfUsers,
        creator: creator.id,
        users,
        messages: [],
      },
    },
  }));
};

