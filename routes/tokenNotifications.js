import express from 'express';
import {getNotificationsTokenByUserId, insertTokenNotifications } from '../controllers/tokenNotifications.js';
const router = express.Router();

router.get('/getNotificationsTokenByUserId', getNotificationsTokenByUserId);
router.post('/insertTokenNotifications', insertTokenNotifications);

export default router;
