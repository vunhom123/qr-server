const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.get("/", (req, res) => {
  res.send("QR server running");
});

app.get("/scan", (req, res) => {
  const qr = req.query.qr;

  io.emit("new_scan", {
    code: qr,
    time: new Date().toLocaleTimeString(),
  });

  res.send("scan ok");
});

server.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});
