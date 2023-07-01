import express from 'express';

const router = express.Router();

import {  registerUser, authUser, addUserInterests } from '../controllers/userController.js';

router.post('/login', authUser);
router.post('/', registerUser);
router.put('/', addUserInterests);

export default router;