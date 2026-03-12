const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", () => {
  console.log("dashboard connected");
});

app.get("/scan", (req, res) => {
  const qr = req.query.qr;

  const data = {
    code: qr,
    time: new Date().toLocaleTimeString(),
  };

  io.emit("new_scan", data);

  res.send("scan ok");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("server running");
});
