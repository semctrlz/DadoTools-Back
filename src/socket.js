const socketio = require('socket.io');

let io;
const connections = [];

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on('Connect', socket => {
    console.log(socket.message);
    return 'oi';
  });
};

exports.findConnections = chat => {
  return connections.filter(connection => {
    console.log(connection);
    return chat;
  });
};

exports.sendMessage = (to, message, data) => {
  console.log('conectado');
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
