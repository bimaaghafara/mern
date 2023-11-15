require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// ENV
const port = process.env.PORT;
const dbURI = process.env.MONGODB_URI;

const transactionsRoutes = require('./routes/transactions')

// app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method, new Date().toLocaleString());
  next();
})

// routes
app.use('/api/transactions', transactionsRoutes)

// connect to db
mongoose.connect(dbURI)
  .then(() => {
    // listen app
    app.listen(port, () => {
      console.log(`Connected to db and listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error)
  })
