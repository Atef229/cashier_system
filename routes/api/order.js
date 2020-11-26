const express = require('express');
const router = express.Router();
const moment = require('moment');

// Load User model
const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const advancedResults = require('../../middleware/advancedResults');

// @route   POST api/order/add
// @desc    add order
// @access  Public
router.post('/',(req, res) => {
  User.findById(req.body.owner)
    .then((owner) => {
      if (!owner) {
            
       // errors.name = 'error';
        return res.status(400).json('User Not Found');
    } else {
      let order_id=parseInt((Math.random() * 100000000), 10);
      const newOrder = new Order({
        //newOrder
       order_id:order_id,
        owner:req.body.owner,
        Created_at:moment().format('L'+' '+'LTS'),
        products:
        {
        product: req.body.product,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice
      },
      notes:req.body.notes,
      TotalPrice:req.body.TotalPrice
        });
        newOrder
        .save()
        .then(product => res.json(product))
        .catch(err => console.log(err));
            console.log(req.body.product);
        Product.findOne({ _id: req.body.product })
       .then(product => {
         if (!product) {
           res.status(404).json('product not found');
         }else
            //  console.log(product.quantity);
            quantity= product.quantity - req.body.quantity
            // console.log(quantity);
            // console.log(req.body.product);
           Product.findOneAndUpdate({_id: req.body.product}
            ,{quantity}, {new: true},
             function (err, product) {
              res.status(200).send(product);
              // newOrder
              // .save()
              // .then(product => res.json(product))
              // .catch(err => console.log(err));
           });
       })
      }
    });
});

// @route   POST api/order/add
// @desc    add order
// @access  Public
//current use api
router.post('/add', (req, res) => {
  let order_id=parseInt((Math.random() * 100000000), 10);
  Order.create({
    order_id:order_id,
    user: req.body.user,
    notes:req.body.notes,
    products: req.body.products,
    totalPrice: req.body.totalPrice,
    Profit: req.body.Profit,
    Created_at:moment().format('L'+' '+'LTS')
  })
    .then(products => res.json(products))
    .catch(err => console.log(err));
    for(let val of req.body.products) {
      console.log(val.product)
      console.log(val.quantity)
       //console.log(val.product)
      Product.updateMany({_id: val.product},
      { $inc: { "quantity": -val.quantity } },
       //{ multi: true },
        function (err, product) {
         res.status(200).send(product);
       }
      );
    }})

// @route   GET api/order/
// @desc    get all orders
// @access  Public
router.get('/',  (req, res, next) => {
  Order.find({
    Created_at: {
      $gt: req.query.Created_start, //date & after
      $lt: req.query.Created_end //before date
    }
  })//.sort({ Created_at: -1 })// sort by Created_at, descending
  .populate('products.product')
  //.populate('owner')
  .exec((err, orders) => {
    if (err) {
      res.json({
        success: false,
        message: "Couldn't find your order"
      });
    } else {
      res.json(
        orders
      );
    }
  });
});


// @route   GET api/order/all
// @desc    get all orders
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
 // sort by alphabetical, descending
 Order.find().sort({ name: -1 })// sort by Created_at, descending
 .populate('products.product')
    .then(order => {
      if (!order) {
        return res.status(404).json({ order: 'There are no order' });
      }

      res.json(order);
    })
    .catch(err => res.status(404).json({ order: 'There are no order' }));
});

// @route   GET api/order/last
// @desc    get last order
// @access  Public
router.get('/last', (req, res) => {
  const errors = {};
 // sort by alphabetical, descending
 Order.findOne().sort({ Created_at: -1 })// sort by Created_at, descending
 .populate('products.product')
    .then(product => {
      if (!product) {
        return res.status(404).json({ product: 'There are no product' });
      }

      res.json(product);
    })
    .catch(err => res.status(404).json({ product: 'There are no product' }));
});

// @route   GET api/order/orders/:order_id
// @desc    get order by order_id
// @access  Public
router.get('/orders/:order_id', (req, res, next) => {
  const errors = {};
  Order.find({ order_id: req.params.order_id })
    .populate('products.product')
    .populate('owner')
    .exec((err, orders) => {
      if (orders==0) {
        errors.order_id = 'Order Not Found';
        res.status(404).json(errors);
        
      } else {
        res.json(
          orders
        );
      }
    });
});


module.exports = router;