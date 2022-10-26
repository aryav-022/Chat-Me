const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/chat-me', () => console.log('MongoDb Connected!'));

app.use(cors());

const server = http.createServer(app);

// Register End Point
app.post('/register', (req, res) => {
    res.send({msg: 'Hello'});
})

// Login End Point
app.post('/login', (req, res) => {
    res.send({msg: 'Hello'});
})


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
    socket.broadcast.emit("online", id);

    // To Send Message across all recipients
    socket.on('send-message', (msg, recipients) => {
        for (let recipient of recipients) {
            // This broadcasts message to this room, in our case room symbolizes personal id
            socket.to(recipient).emit('receive-message', { sender: id, msg });
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

server.listen(PORT, () => { console.log("Server started on http://localhost:8000"); })