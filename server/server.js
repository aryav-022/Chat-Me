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
    // Making a static id
    const id = socket.handshake.query.id;
    // Joining a room named that static id
    socket.join(id);

    // Emmiting to all users that this socket user is online now
    socket.broadcast.emit("online", socket.id);

    // To Send Message across all recipients
    socket.on('send-message', (message, recipients) => {
        for (let recipient of recipients) {
            // This broadcasts message to this room, in our case room symbolizes personal id
            socket.to(recipient).emit('receive-message', message);
        }
    })

    // On disconnect, retry to connect and send to other users that this socket user is offline now
    socket.on("disconnect", (reason) => {
        if (reason === "io server disconnect") {
            // Try to reconnect
            socket.connect();
        }
        io.emit("offline", id);
    });
})

server.listen(8000, () => { console.log("Server started on http://localhost:8000"); })