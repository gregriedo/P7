const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const articlesRoutes = require('./routes/articles');
const commentsRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require('hpp');




const app = express();

  
  
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next(); 
});
   
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Chaque IP est limité à 100 requêtes par windowMs
});

app.use(limiter);  
app.use(helmet()); // Sécurisation des en-têtes HTTP
app.use(hpp()); 

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/articles', articlesRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/auth', userRoutes);

  

module.exports = app;
