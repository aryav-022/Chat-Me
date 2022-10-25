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
    socket.broadcast.emit("online", socket.id);
    socket.on('send-message', message => {
        socket.broadcast.emit('receive-message', message);
        console.log(message);
    })
    socket.on("disconnect", (reason) => {
        if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, you need to reconnect manually
            socket.connect();
        }
        io.emit("offline", socket.id);
    });
})

server.listen(8000, () => { console.log("Server started on http://localhost:8000"); })