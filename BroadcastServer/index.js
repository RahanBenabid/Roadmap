const express = require("express");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
