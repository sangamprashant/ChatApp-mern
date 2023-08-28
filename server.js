const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
  socket.on("newUser", function(username){
    socket.broadcast.emit("update", username + " joined the conversation."); // Corrected spelling of "broadcast"
  });
  socket.on("exitUser", function(username){
    socket.broadcast.emit("update", username + " left the conversation."); // Corrected spelling of "broadcast"
  });
  socket.on("chat", function(message){
    socket.broadcast.emit("chat", message); // Corrected spelling of "broadcast"
  });
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
