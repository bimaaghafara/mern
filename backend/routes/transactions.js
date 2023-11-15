const express = require('express');
const Transaction = require('../models/Transaction');

const router = express.Router();

// GET all transactions
router.get('/', (req, res) => {
  res.json({ mssg: 'GET all transactions' })
})

// GET a single transaction
router.get('/:id', (req, res) => {
  res.json({ mssg: 'GET a single transaction' })
})

// POST a new transaction
router.post('/', async (req, res) => {
  const { description, amount, type } = req.body;
  try {
    const transaction = await Transaction.create({
      description, type, amount
    });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

// DELETE a transaction
router.delete('/:id', (req, res) => {
  res.json({ mssg: 'DELETE a transaction' })
})

// UPDATE a transaction
router.patch('/:id', (req, res) => {
  res.json({ mssg: 'UPDATE a transaction' })
})

module.exports = router;