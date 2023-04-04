const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts')

app.use(bodyParser.json());
mongoose.connect('mongodb+srv://danielwiinberg:i3RIqnsoVOaIDsCG@mean-tutorial.4hn8qkz.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  }).catch(() => {
    console.log('Connection to database failed!');
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app;