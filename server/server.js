const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://192.168.0.107:5173", "http://localhost:5173"],
        methods: ["GET", "POST"]
    }
})

io.on('connection', socket => {
    socket.emit("online", 2);
    setTimeout(() => {
        socket.emit("online", 0);
    }, 10000);
    socket.on('send-message', message => {
        socket.broadcast.emit('receive-message', message)
        console.log(message);
    })
})

server.listen(8000, () => {console.log("Server started on http://localhost:8000");})