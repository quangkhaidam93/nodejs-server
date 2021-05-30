const socketIo = require("socket.io");

const startSocket = server => {
  const io = socketIo(server);

  io.sockets.on("connection", (socket) => {
    console.log("New client connected");
    
    // Join game
    socket.on("joinRoom", gameId => {
      socket.join(gameId);
    });

    // Chat in game
    socket.on("sendMessage", data => {
      io.to(data.roomId).emit("sendMessage", {
        userId: data.userId,
        message: data.message,
        time: Date.now()
      })
    });

    // Move in game
    // socket.on("move", data => {
    //   io.to(data.roomId).broadcast.emit("move", {
    //     currentBoard: 
    //   })
    // })

    // Disconnect socket
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = {
  startSocket
}


