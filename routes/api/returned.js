const express = require('express');
const router = express.Router();
const moment = require('moment');

// Load User model
const Returned = require('../../models/Returned');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

// @route   GET api/Returned/test
// @desc    Tests Returneds route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Returned Works' }));

// @route   POST api/expenses/add
// @desc    Expenses
// @access  Public
router.post('/add',(req, res) => {
    // const { errors, isValid } = validateAddInput(req.body);
    
    //   // Check Validation
    //   if (!isValid) {
    //  return res.status(400).json(errors);
    //    } 

    Order.findOne({order_id: req.body.order_id})
    //.deepPopulate(['products','products.product'])
    .then((order) => {
      if (!order) {
            
       // errors.name = 'error';
        return res.status(400).json('Order Not Found');
       
    } else {   
        console.log(order);    
    const newreturned = new Returned({
    owner:req.body.owner,
    order_id: req.body.order_id,
    products:{
      product: req.body.product,
      quantity: req.body.quantity,
    },
    Created_at:moment().format('L'+' '+'LTS')
    });
        newreturned
        .save()
        .then(newreturned => res.json(newreturned))
        .catch(err => console.log(err));
    }
});
        });

// @route   GET api/returned/all
// @desc    Get all returned
// @access  Public
router.get('/all', (req, res) => {
    // const errors = {};
    // sort by alphabetical, descending
     Returned.find().sort({ Created_at: -1 })// sort by Created_at, descending
    .populate('owner')
    //.populate('product')
       .then(returned => {
         if (!returned) {
           return res.status(404).json({ returned: 'There are no returned' });
         }
   
         res.json(returned);
       })
       .catch(err => res.status(404).json({ returned: 'There are no returned' }));
   });

module.exports = router;