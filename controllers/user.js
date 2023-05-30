const User = require('../models/userModel')
const Document = require('../models/postModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');


const register = async (req,res) => {
    const { name, email, password } = req.body;
    
    try {    
        const user = await User.findOne({ where: { email:email } });
        if (user) {
            return res.status(404).json({ 
                status: 400,
                success: false,
                message: "Email already exists"
            });
          }  
        const users = await User.create({name, email, password})
        await users.save();
        res.status(200).json({
            status: 201,
            success: true,
            message: users
        });
    } catch (error) {
        res.status(500).res.json(error);
    }
}

const login = async(req,res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ where: { email:email } });
    try {
        
        if (!user) {
            return res.status(404).json({ 
                status: 400,
                success: false,
                message: "Email is not found!"
            });
        }
        const isValidPassword = await bcrypt.compare(password, user.password );
        if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({
            status: 201,
            success: true,
            message: {
                token
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}

module.exports = {
    register, login
}