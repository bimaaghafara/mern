const mongoose = require('mongoose');
const Transaction = require('../models/transaction');

// get all transactions
const getTransactions = async (req, res) => {
  const transactions = await Transaction
    .find({})
    .sort({ createdAt: -1 })
  res.status(200).json(transactions)
}

// get a single transaction
const getTransaction = async (req, res) => {
  // validate id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such transaction' })
  }

  // get transaction
  const transaction = await Transaction.findById(id)
  if (!transaction) {
    return res.status(404).json({ error: 'No such transaction' })
  }
  res.status(200).json(transaction)
}


// create a transaction
const createTransaction = async (req, res) => {
  // validate fields
  const { description, amount, type } = req.body;
  let emptyFields = [];
  if (!description) {
    emptyFields.push('description')
  }
  if (!amount) {
    emptyFields.push('amount')
  }
  if (!type) {
    emptyFields.push('type')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // create transaction
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
}

// delete a transaction
const deleteTransaction = async (req, res) => {
  // validate id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such transaction' })
  }

  // delete transaction
  const transaction = await Transaction.findOneAndDelete({ _id: id })
  if (!transaction) {
    return res.status(400).json({ error: 'No such transaction' })
  }
  res.status(200).json(transaction)
}

// update a transaction
const updateTransaction = async (req, res) => {
  // validate id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such transaction' })
  }

  // update transaction
  const transaction = await Transaction.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })
  if (!transaction) {
    return res.status(400).json({ error: 'No such transaction' })
  }

  res.status(200).json(transaction)
}


module.exports = {
  createTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
  updateTransaction
}