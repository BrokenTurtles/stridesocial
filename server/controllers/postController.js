import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';


//ENDPOINT  POST api/posts
//PURPOSE   Add a new post
//ACCESS    Private
const addPost = asyncHandler(async (req, res) => {
	// how do we get the user id for post ? 
    const {userId, name, profilePic, body, tags} = req.body
    console.log('req body on addPost',req.body)
	const post = await Post.create({
		user: userId,
		name,
		profilePic,
		body,
		tags: (tags ? tags : []),
		
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

// ENDPOINT UPDATE api/posts/u/:id
const editPost = asyncHandler(async (req, res) => {
	// required : response body must contain updated message 
	const {body, tags} = req.body; 
	
	// optioal stretch : edited tag 
	const post = await Post.findById(req.params.id); 

	try {
		post.body = (body ? body : post.body); 

		// if the interests array exists we add it in 
		if( interests ) post.tags =  post.tags ; 
		await post.save() ; 
		res.json({message: 'Post edited'});
	} catch {
		res.status(404); 
		throw new Error('Post not found '); 
	} 

}); 


// ENPOINT READ api/posts?tag=<tagname> 
// PURPOSE: find posts by tag
// ACCESS: public
const findTaggedPosts = asyncHandler( async (req, res) => {
	
	// required parameters: the tag you want to search by must be in req.query (?tag=)
	const {tag} = req.query; 

	const posts = await Posts.find() ; 
	const taggedPosts = posts.filter( post => {
		post.tags.contains(tag);
	} )
	res.json(taggedPosts);


}

)

export { getAllPosts, addPost, deletePost, editPost, findTaggedPosts };