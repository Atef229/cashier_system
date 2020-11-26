const express = require('express');
const router = express.Router();
const moment = require('moment');

// Load User model
const Expenses = require('../../models/Expenses');

// Load Input Validation
const validateAddInput = require('../../validation/add-expenses');

// @route   GET api/expenses/test
// @desc    Tests admins route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Expenses Works' }));

// @route   POST api/expenses/add
// @desc    Expenses
// @access  Public
router.post('/add',(req, res) => {
    const { errors, isValid } = validateAddInput(req.body);
    
      // Check Validation
      if (!isValid) {
     return res.status(400).json(errors);
       } 
              
    const newExpenses = new Expenses({
    username:req.body.username,
    cost: req.body.cost,
    notes: req.body.notes,
    Created_at:moment().format('L'+' '+'LTS')
    });
        newExpenses
        .save()
        .then(newExpenses => res.json(newExpenses))
        .catch(err => console.log(err));

        });

// @route   GET api/expenses/all
// @desc    Get all expenses
// @access  Public
router.get('/all', (req, res) => {
     const errors = {};
     Expenses.find({
      Created_at: {
        $gt: req.query.Created_start, //date & after
        $lt: req.query.Created_end //before date
      }
    })
    .exec((err, expenses) => {
      if (err) {
        res.json({
          success: false,
          message: "Couldn't find your expenses"
        });
      } else {
        res.json(
          expenses
        );
      }
    });
  });
  //   // sort by alphabetical, descending
  //    Expenses.find().sort({ Created_at: -1 })// sort by Created_at, descending
  //      .then(expenses => {
  //        if (!expenses) {
  //          return res.status(404).json({ expenses: 'There are no expenses' });
  //        }
   
  //        res.json(expenses);
  //      })
  //      .catch(err => res.status(404).json({ expenses: 'There are no expenses' }));
  //  });

module.exports = router;