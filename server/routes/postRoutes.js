import express from 'express';

const router = express.Router();

import {
	addPost,
    getAllPosts,
    deletePost,
    editPost,
} from '../controllers/postController.js';

router.get('/', getAllPosts);
router.delete('/:id', deletePost);
router.post('/', addPost);
router.put('/:id',editPost);
export default router;