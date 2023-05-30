const express = require('express');
const { addPost, getAllPost } = require('../controllers/post');
const { requireAuth } = require('../middlewares/authenticate');
const router = express.Router();
const Comment = require('../models/commentModel');
const Post = require('../models/commentModel');
const User = require('../models/userModel')

router.post('/', requireAuth, addPost);
router.get('/', requireAuth, getAllPost);

router.get('/posts/:id', async (req, res) => {
    try {
      const id = req.params.id;
    //   const post = await Post.findAll({where: {id:id}});
      const post = await Comment.findAll({ where: { postId: id} });
      console.log(post);
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/comments', requireAuth, async (req, res) => {

    try {
      const { content, postId } = req.body;
      const userId = req.user.id;
      const comment = await Comment.create({ content, postId, userId });
      res.json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;