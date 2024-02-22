import express from 'express';
import { compareCode, sendphone } from '../controllers/sendphone.js';
const router = express.Router();

router.post('/sendphone', sendphone);
router.get('/comparecode', compareCode);

export default router;
