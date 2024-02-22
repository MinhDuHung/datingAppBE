import express from 'express';
import { compareCode, sendemail } from '../controllers/sendemail.js';
const router = express.Router();

router.post('/sendemail', sendemail);
router.get('/comparecode', compareCode);

export default router;
