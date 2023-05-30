const User = require('../models/userModel');
const Post = require('../models/postModel');

const addPost = async(req,res) => {
    const { title, content } = req.body;

    const userId = req.user;

    // console.log(userId);

    try {
        const user = await User.findByPk(userId.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(user.id);

    const post = await Post.create({ title, content, userId:user.id });
    return res.status(201).json(post);
    } catch (error) {
        res.json(error);
    }
}

const getAllPost = async(req,res) => {
    const userId = req.user;
    try {
        const user = await User.findByPk(userId.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const posts = await Post.findAll({where: {userId:user.id}});
        res.json({
            posts,
            user
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}



module.exports = {
    addPost,
    getAllPost
}