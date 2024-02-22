import express from 'express';
import { authPassword, authToken, compareToken, findUserById, findUserByPagination, loginUser, logoutUser, registerUser, updateLocation, updateUser } from '../controllers/users.js';
const router = express.Router();

router.get('/loginUser', loginUser);
router.get('/compareToken', compareToken);
router.post('/registerUser', registerUser)
router.post('/logoutUser', logoutUser)
router.put('/updateUser', updateUser)
router.get('/authPassword', authPassword)
router.get('/authToken', authToken)
router.get('/findUserById', findUserById)
router.get('/findUserByPagination', findUserByPagination)
router.post('/updateLocation', updateLocation)
export default router;
