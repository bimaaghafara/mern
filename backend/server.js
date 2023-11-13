require('dotenv').config();
const express = require('express');
const port = process.env.PORT;
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

// listen app
app.listen(port, () => {
  console.log(`Listening on port ${port} ~`);
});