const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./userModel');
const Comment = require('./commentModel')

const Post = sequelize.define('Posts', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    postId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Post.associate = function(models) {
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'postId' });
  };
  

  module.exports = Post;

  