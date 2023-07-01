import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';


//ENDPOINT  POST api/posts
//PURPOSE   Add a new post
//ACCESS    Private
const addPost = asyncHandler(async (req, res) => {

    const {userId, name, profilePic, body} = req.body
    console.log('req body on addPost',req.body)
	const post = await Post.create({
		user: userId,
		name,
		profilePic,
		body,
		
	});

	if (post) {
		res.json(post);
	} else {
		res.status(404);
		throw new Error('Error creating post');
	}
});

//ENDPOINT  GET api/posts
//PURPOSE   Retrieve all posts
//ACCESS    Private
const getAllPosts = asyncHandler(async (req, res) => {

    //IF WE WANT TO DO SOME SORT OF FILTER BY INTERESTS LATER ON FOR STRETCH
    // const keyword = req.query.keyword ? {
    //     name: {
    //         $regex: req.query.keyword,
    //         $options: 'i'
    //     }
    // } : {}

    //ADD ...keyword to our mongoose find
    
        const posts = await Post.find();
        res.json(posts);

    //DO WE NEED TO HANDLE A NO POSTS SITUATION? I DONT THINK SO.
    });

// ENDPOINT  DELETE api/posts/:id
// PURPOSE   Remove a post by Id
// ACCESS    Private
const deletePost = asyncHandler(async (req, res) => {
	const post = await Post.findById(req.params.id);

    console.log('found the post: ', post)

	if (post) {
		await post.deleteOne()
		res.json({message: 'Post removed'})
	} else {
		res.status(404);
		throw new Error('Post not found');
	}
});

export { getAllPosts, addPost, deletePost };