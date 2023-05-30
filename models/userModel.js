const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const bcrypt = require('bcrypt');
const Post = require('./postModel.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, );

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

User.associate = function(models) {
  User.hasMany(models.Post, { foreignKey: 'userId' });
  User.hasMany(models.Comment, { foreignKey: 'userId' });
};

// User.associate = function(models) {
  
// };

// Account.associate = function (models) {
//   Account.hasMany(models.History, {
//       onDelete: "cascade"
//   });
//   Account.hasMany(models.User, {
//       onDelete: "cascade"
//   });
// };



module.exports = User;
