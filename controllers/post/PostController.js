const { default: mongoose } = require("mongoose");
const PostModel = require("../../model/post_model");

// createpost
const createPost = async (req, res, next) => {
    console.log('post requrest in post', req.body)
    const { content, pic } = req.body;
    const postedBy = req.user._id

    try {
        if (!content || !pic) {
            return res.status(400).json({ msg: 'Post content and pic is required' })
        }

        const newPost = await PostModel.create({ content, pic, postedBy })

        // Populate the 'PostedBy' filed to get the document with id and username
        // await newPost.populate('PostedBy', 'id username')
        res.json(newPost)
    } catch (error) {
        return next(error)
    }
}

// allpost
const allPost = async (req, res, next) => {
    try {
        const posts = await PostModel.find()
        for (const post of posts) {
            await post.populate('comments.postedBy', '_id fullname')
        }

        res.json(posts)
    } catch (error) {
        return next(error)
    }

}

// get single post
const getSinglePost = async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.postId)
        await post.populate('comments.postedBy', '_id fullname')
        res.json(post)
    } catch (error) {
        return next(error)
    }

}

// delete my post
const deletePost = async (req, res, next) => {
    try {
        const post = await PostModel.findByIdAndDelete(req.params.postId)
        if (!post) {
            return next({ msg: 'Post not found', status: 404 })
        }
        res.json(post)
    } catch (error) {
        return next(error)
    }
}

// mypost
const myPost = async (req, res, next) => {
    try {
        const myPost = await PostModel.find({ postedBy: req.user._id })
        for (const post of myPost) {
            await post.populate('comments.postedBy', '_id fullname')
        }
        if (!myPost) {
            return next({ msg: 'Post not found', status: 404 })
        }

        res.json(myPost)

    } catch (error) {
        return next(error)
    }
}

// like
const like = async (req, res, next) => {
    const postId = req.body.postId
    try {
        await PostModel.findByIdAndUpdate(postId, {
            $push: { likes: req.user._id }
        }, { new: true })
            .then(post => {
                res.json(post)
            })
    } catch (error) {
        return next(error)
    }
}

// unlike
const unlike = async (req, res, next) => {
    const postId = req.body.postId
    try {
        await PostModel.findByIdAndUpdate(postId, {
            $pull: { likes: req.user._id }
        }, { new: true })
            .then(post => {
                res.json(post)
            })
    } catch (error) {
        return next(error)
    }
}

// comment
const comment = async (req, res, next) => {
    try {
        console.log('commetn', req.body)
        console.log('commetn >>>', req.user._id)
        if (!req.body.postId || !req.body.text) {
            return res.status(400).json({ error: 'Post ID and comment text are required' })
        }
        const comment = {
            text: req.body.text,
            postedBy: req.user._id
        }
        await PostModel.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }, { new: true })
            .populate('comments.postedBy', '_id fullname')
            .then(post => {
                res.json(post)
            })
            .catch(err => {
                return next(err)
            })
    } catch (error) {
        return next(error)
    }
}

// delete my comment
const deleteComment = async (req, res, next) => {
    const postId = req.params.postId
    const commentId = req.body.commentId
    try {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ error: 'Invalid postId or commentId' })
        }

        const post = await PostModel.findByIdAndUpdate(postId)
        if (!post) {
            return res.status(404).json({ error: 'post not found' })
        }

        //   check if the commetn exist in the post
        const commentIndex = post.comments.findIndex(comment => comment._id.equals(commentId))
        if (commentIndex === -1) {
            return res.status(404).json({ error: 'comment not found' })
        }

        // remove comment from the post
        post.comments.splice(commentIndex, 1)
        await post.save();

        // respont with the updated post 
        res.json(post)
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    createPost,
    allPost,
    getSinglePost,
    deletePost,
    myPost,
    like,
    unlike,
    comment,
    deleteComment,

}