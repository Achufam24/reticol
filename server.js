const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const sequelize = require('./database');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Create a new Sequelize instance


sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Define your models and their associations using sequelize.define()

// Define your routes and middleware using app.get(), app.post(), etc.

// Start the server
const port = 3000;

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
