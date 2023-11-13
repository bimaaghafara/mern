require('dotenv').config();
const express = require('express');
const port = process.env.PORT;

// app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the app!' })
})

// listen app
app.listen(port, () => {
  console.log(`Listening on port ${port} ~`);
});