// app.mjs
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import storiesRoute from './routes/stories.js';
import usersendingmatches from './routes/usersendingmatches.js';
import userreceivingmatches from './routes/userreceivingmatches.js';
import userfriends from './routes/userfriends.js';
import userinterests from './routes/userinterests.js';
import chatrooms from './routes/chatrooms.js';
import users from './routes/users.js';
import sendemail from './routes/sendemail.js';
import sendphone from './routes/sendphone.js';
import tokenNotifications from "./routes/tokenNotifications.js"
import sendNotification from "./routes/sendNotification.js"
import { connectDB } from './connectDB.js'
import admin from "firebase-admin"
import dotenv from 'dotenv';
import { createServer } from 'http';
import { initializeSocket } from './socket.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT;

const server = createServer(app);
const io = initializeSocket(server);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

connectDB()
app.use(cors({
    origin: '*',
    methods: '*',
}));
process.env.GOOGLE_APPLICATION_CREDENTIALS

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/stories', storiesRoute);
app.use('/usersendingmatches', usersendingmatches);
app.use('/userreceivingmatches', userreceivingmatches);
app.use('/userfriends', userfriends);
app.use('/userinterests', userinterests);
app.use('/chatrooms', chatrooms);
app.use('/users', users);
app.use('/email', sendemail);
app.use('/phone', sendphone);
app.use('/tokenNotifications', tokenNotifications);
app.use('/sendNotification', sendNotification);


