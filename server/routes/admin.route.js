import express from 'express';
const router = express.Router();
import { showUsers, getUserDetails, updateUserDetails, deleteUser } from '../controllers/admin.controller.js';

router.get('/panel', showUsers);
router.get('/user-details/:id', getUserDetails);
router.post('/update-user-details/:id' , updateUserDetails);
router.delete('/delete-user/:id', deleteUser);

export default router;