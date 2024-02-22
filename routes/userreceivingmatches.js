import express from 'express';
import { getAllSenderUsers, addSenderUser, removeSenderId } from '../controllers/userreceivingmatches.js';
const router = express.Router();

router.get('/getAll', getAllSenderUsers);
router.post('/addSendingUser', addSenderUser)
router.put('/removeSendingUser', removeSenderId)

export default router;
