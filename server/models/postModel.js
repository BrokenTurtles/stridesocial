import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = Schema({

    user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
	},
	
	profilePic: {
		type: String,
	},
	body: {
        type: String,
        required: true
    },
	date: {
		type: Date,
		default: Date.now,
	},
});



const Post = mongoose.model('posts', postSchema);

export default Post;