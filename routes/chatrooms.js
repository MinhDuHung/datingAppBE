import express from 'express';
import { getOneChatRoom, insertDataToChatRoom } from '../controllers/chatrooms.js';
const router = express.Router();

router.get('/getOneChatRoom', getOneChatRoom);
router.post('/insertDataToChatRoom', insertDataToChatRoom);

export default router;
