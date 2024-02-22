import express from 'express';
import {getStories, getStoriesByUserIds, postStories } from '../controllers/stories.js';
const router = express.Router();

router.get('/getStories', getStories);
router.get('/getByUserId', getStoriesByUserIds);
router.post('/postStories', postStories)

export default router;
