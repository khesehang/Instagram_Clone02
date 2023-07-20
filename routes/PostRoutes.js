const { createPost, allPost, getSinglePost, deletePost, myPost, like, unlike, comment, deleteComment } = require('../controllers/post/PostController');
const { userVerify } = require('../middleware/Authentication');


const router = require('express').Router();

router.post('/createpost',userVerify,createPost)
router.get('/allpost',userVerify,allPost)
router.get('/mypost',userVerify,myPost)
router.put('/like',userVerify,like)
router.put('/unlike',userVerify,unlike)
router.put('/comment',userVerify,comment)
router.put('/comment/:postId',userVerify,deleteComment)
router.get('/:postId',userVerify,getSinglePost)
router.delete('/:postId',userVerify,deletePost)


module.exports = router;
