import express from 'express';
import { sendNotification } from '../fcm/sendNotification.js';
const router = express.Router();

router.post('/sendToUserNotiToken', sendNotification);

export default router;
