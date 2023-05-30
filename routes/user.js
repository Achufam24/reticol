const express = require('express');
const router = express.Router();
const User = require('../models/userModel')
const Document = require('../models/postModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const { register, login } = require('../controllers/user')


//get all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.findAll({});
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  //registration
 router.post('/register', register);

 //login
 router.post('/login', login);


 //drop user db

 router.post('/', async(req,res) => {
    try {
        await User.drop();
        res.json("User Table dropped")
        console.log("All tables dropped!");
    } catch (error) {
        console.log(error);
    }
 })

module.exports = router;
  