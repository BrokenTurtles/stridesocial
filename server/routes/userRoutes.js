import express from 'express';

const router = express.Router();

import {  registerUser, authUser } from '../controllers/userController.js';

router.post('/login', authUser);
router.post('/', registerUser);


export default router;