const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const { emit } = require("process");

const app = express();

const isDevEnv = app.settings.env === 'development';
const URL = isDevEnv ? 'http://localhost:3000' : 'https://sketch-online.vercel.app';

app.use(cors({ origin: URL }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
     cors: URL
});

io.on("connection", (socket) => {
     console.log('server is connected');
});

// when draw - it should reflect to all other screens
socket.on('beginPath', (arg) => {
     socket.broadcast.emit('beginPath', arg)
});

// to change color and size in other windows simultaneously
socket.on('drawLine', (arg) => {
     socket.broadcast.emit('drawLine', arg)
});

socket.on('changeConfigs', (arg) => {
     socket.broadcast.emit('changeConfigs', arg)
});

httpServer.listen(5000);