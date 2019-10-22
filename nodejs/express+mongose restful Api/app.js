const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import Routers
const postsRouter = require('./routers/posts');
app.use('/posts', postsRouter);

// CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('connected to DB');
});
app.listen(3000, () => {
  console.log('listing on port 3000, http://localhost:3000/');
});
