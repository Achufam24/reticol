const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./userModel');
const Post = require('./postModel')


const Comment = sequelize.define('Comments', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  });

//   Comment.belongsTo(Post);
//   Comment.belongsTo(User);

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Post, { foreignKey: 'postId' });
  };
 


  module.exports = Comment;