
module.exports = (data, clientSocket) => {
  const { user } = clientSocket;
  user.removeToken(user.currentToken).then(() => {
    clientSocket.send(JSON.stringify({
      event: 'logoutConfirmation',
      data: { status: true },
    }));

    clientSocket.close();
  }, () => {
    clientSocket.send(JSON.stringify({
      event: 'logoutConfirmation',
      data: { status: false },
    }));
  });
};
