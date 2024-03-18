const { addExpense, getExpense, deleteExpense } = require('../controllers/Expense');
const {addIncome, getIncomes, deleteIncomes} = require('../controllers/Income');
const router = require('express').Router();



router.post('/add-incomes', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-incomes/:id', deleteIncomes)
    .post("/add-expense", addExpense)
    .get("/get-expenses", getExpense)
    .delete("/delete-expense/:id", deleteExpense)

module.exports = router