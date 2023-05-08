// PACKAGES
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// FILE IMPORTS
const mongoUser = require('../mongo.user');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

mongoose.connect(`mongodb+srv://${mongoUser.user}:${mongoUser.password}@mean-tutorial.4hn8qkz.mongodb.net/node-angular?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to database!');
  }).catch(() => {
    console.log('Connection to database failed!');
  });

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports = app;