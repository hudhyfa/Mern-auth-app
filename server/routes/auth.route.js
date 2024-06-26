import express from 'express';
import { signin, signup, google, signout, adminLogin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);
router.post('/admin-login', adminLogin);

export default router;