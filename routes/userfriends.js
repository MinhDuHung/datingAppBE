import express from 'express';
import { getAllFriends, insertNewFriend } from '../controllers/userfriends.js';
const router = express.Router();

router.get('/getAll', getAllFriends);
router.post('/insertNewFriend', insertNewFriend);
export default router;