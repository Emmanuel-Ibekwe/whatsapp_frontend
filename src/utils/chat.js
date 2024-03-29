export const getConversationId = (user, users) => {
  return users[0]._id === user._id ? users[1]._id : users[0]._id;
};

export const sortInDescendingLatestMessageTime = arr => {
  return arr.sort((convo1, convoNext) => {
    return (
      new Date(convoNext?.latestMessage?.createdAt) -
      new Date(convo1?.latestMessage?.createdAt)
    );
  });
};

export const getConversationName = (user, users) => {
  return users[0]._id === user._id ? users[1].name : users[0].name;
};

export const getConversationPicture = (user, users) => {
  return users[0]._id === user._id ? users[1].picture : users[0].picture;
};
