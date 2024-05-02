import express from 'express';
const router = express.Router();
import { showUsers } from '../controllers/admin.controller.js';

router.get('/panel', showUsers);

export default router;