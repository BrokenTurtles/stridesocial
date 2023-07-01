import express from 'express';

const router = express.Router();

import {
	addPost,
    getAllPosts,
    deletePost,
    findTaggedPosts,
    editPost,
} from '../controllers/postController.js';

router.get('/', getAllPosts);
router.delete('/:id', deletePost);
router.post('/', addPost);
router.put('/:id',editPost);
router.get('/?tag', findTaggedPosts);
export default router;