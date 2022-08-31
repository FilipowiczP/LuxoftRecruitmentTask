const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require('cors');
const gameMap = require('./createBoardMap');

app.use(cors());

const server = http.createServer(app);
const players = [];
const map = gameMap.crateBoard()

const io = new Server(server, {
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket)=>{
  socket.on("joinToGame", ({ userName })=>{
    players.push(userName)
    socket.broadcast.emit("playersInRoom", {userName: userName, players: players})
    socket.broadcast.emit("startGame", map)
  })
  socket.on("showCard", (clickedCardPosition)=>{
    socket.broadcast.emit("showEnemy", clickedCardPosition)
  })
})

server.listen(3001, ()=>{
  console.log('Server is running');
})