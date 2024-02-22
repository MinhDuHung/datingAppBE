import express from 'express';
import { getAllReceiverUsers, addReceiverUser, removeReceiverId } from '../controllers/usersendingmatches.js';
const router = express.Router();

router.get('/getAll', getAllReceiverUsers);
router.post('/addReceiverUser', addReceiverUser)
router.put('/removeReceiverUser', removeReceiverId)

export default router;
