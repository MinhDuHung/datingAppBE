import express from 'express';
import { addInterests } from '../controllers/userinterests.js';
const router = express.Router();

router.post('/addinterests', addInterests)

export default router;
