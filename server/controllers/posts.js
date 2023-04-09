import Post from "../models/Post.js";


//creating functions 
export const createPost = async (req, res) => { //logic of creating a post

    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {
                //if any user has liked a post of anotehr user, it will show up like: "someId: true"
            },
            comments: []

        })

        await newPost.save();

        const post = await Post.find(); //201 ceated something
        res.status(201).json(post); //returning all the Posts



    }
    catch (err) {
        res.status(409).json({ message: err.message })
    }

}

//reading 

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find(); //200 accepting requests
        res.status(200).json(post); //returning all the Posts

    }

    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

//working on Userfeeds
export const getUserPosts = async (req, res) => {

    try {
        const { userId } = req.params;
        const post = await Post.find({ userId }); //200 accepting requests
        res.status(200).json(post); //returning all the Posts

    }

    catch (err) {
        res.status(404).json({ message: err.message })
    }

}

//update Comment

export const likePost = async ( req, res ) => {

    try {

        //for Liking Posts
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked){

            post.likes.delete(userId);

        }
        else {
            post.likes.set(userId, true);
        }


        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes },
            { new: true }

        );

        res.status(200).json(updatedPost); //returning all the Posts

    }

    catch (err) {
        res.status(404).json({ message: err.message })
    }
}