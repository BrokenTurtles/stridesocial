import express from 'express';

const router = express.Router();

import {
	addPost,
    getAllPosts,
    deletePost
} from '../controllers/postController.js';

router.get('/', getAllPosts);
router.delete('/:id', deletePost)
router.post('/', addPost)

export default router;