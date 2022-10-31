const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const Users = require('./models/user');
const nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = 8000;

console.log(process.env.TESTING);

mongoose.connect(process.env.MONGO_DB_URL, () => console.log('MongoDb Connected!'));

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    method: ['GET', 'POST']
}));
app.use(express.json());

const server = http.createServer(app);

// function generateOTP() {
//     const lowerCase = "qwertyuiopasdfghjklzxcvbnm";
//     const upperCase = "QWERTYUIOPASDFGHJKLZXCVBNM";
//     const numbers = "98754114578903456789876543";

//     const type = [lowerCase, upperCase, numbers];

//     let otp = "";

//     for (let i = 0; i < 6; i++) {
//         const from = Math.floor(3 * (Math.random() - 0.0000000000001));
//         const index = Math.floor(26 * (Math.random() - 0.00000000000001));
//         otp += type[from][index];
//     }

//     return otp;
// }

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});


app.get("/testing", (req, res) => {
    res.send("Passed");
})

// Login End Point
app.post('/login', async (req, res) => {
    const { name, email, image } = req.body;

    const user = await Users.findOne({ email }).lean();

    if (!user) {
        try {
            const user = await Users.create({ name, email, image });
            console.log('User created successfully!');

            const token = jwt.sign({ name, email, image }, process.env.JWT_SECRET);

            let mailoptions = {
                from: process.env.USER,
                to: email,
                subject: "Chat Me Registeration",
                text: `Thank You ${name} for registering in Chat Me. Welcome to the world of awesome chats.`
            }

            transporter.sendMail(mailoptions, (err, success) => {
                if (err) console.error(err);
                else {
                    console.log("Email sent succesfully");
                };
            })

            res.status(201).json({ status: 'ok', code: 201, token });
        } catch (err) {
            console.log(err);
            res.json({ status: 'error', code: 501, msg: JSON.stringify(err.message) });
        }
    }
    else {
        const token = jwt.sign({ name, email, image }, process.env.JWT_SECRET);
        res.status(201).json({ status: 'ok', code: 201, token });
    }
})

app.post('/search', async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ email }).lean();
    if (!user) res.json({ status: "error", code: 404, msg: "User not found with this email!" });
    else res.json({ status: "ok", code: 201, msg: "User Exists with this email", data: { name: user.name, email: user.email, image: user.image } });
})


const io = new Server(server, {
    cors: {
        origin: [process.env.ALLOWED_ORIGIN],
        methods: ["GET", "POST"]
    }
})


let onlineUsers = new Set();

io.on('connection', async (socket) => {
    // Making a static id
    const { id, token } = socket.handshake.query;

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // Joining a room named that static id
        socket.join(id);

        const user = await Users.findOne({ email: id }).lean();
        const pendingMessages = user.pendingMessages;
        pendingMessages.forEach(message => {
            io.to(id).emit('receive-message', message);
        })
        Users.findOneAndUpdate({ email: id }, { pendingMessages: [] });


        // Adding id to list of all online users
        onlineUsers.add(id);
        // Emmiting updated array
        io.emit("online", [...onlineUsers]);

        // To send Message across all recipients
        socket.on('send-message', async (msg, recipients) => {
            // This broadcasts message to this room, in our case room symbolizes personal id
            for (let recipient of recipients) {
                // Checking if user is online, if not messages are stored in database
                if (onlineUsers.has(recipient)) socket.to(recipient).emit('receive-message', { room: id, sender: id, msg });
                else {
                    const user = await Users.findOne({ email: recipient });
                    user.pendingMessages.push({ room: id, sender: id, msg });
                    user.save();
                }
            }
        })

        // On disconnect, retry to connect and send to other users that this socket user is offline now
        socket.on("disconnect", (reason) => {
            if (reason === "io server disconnect") {
                // Try to reconnect
                socket.connect();
            }
            onlineUsers.delete(id);
            io.emit("online", [...onlineUsers]);
        });
    } catch (err) {
        console.error(err);
        socket.disconnect();
    }
})

server.listen(PORT, () => { console.log("Server started on https://chat-me.onrender.com"); })