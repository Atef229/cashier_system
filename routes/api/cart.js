const express = require('express');
const router = express.Router();

// Load User model
const Cart = require('../../models/Cart');
const User = require('../../models/User');

// @route   GET api/cart/test
// @desc    Tests cart route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Cart Works' }));

// @route   POST api/cart/add
// @desc    cart
// @access  Public
router.post('/add',  (req, res) => {
    const user = req.body.user;
    const item = {
      product: req.body.product,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
      total_Wholesale_price: req.body.total_Wholesale_price,
    };
    Cart.findOne({ user: user })
      .then((foundCart) => {
        if (foundCart) {
          let products = foundCart.items.map((item) => item.product + '');
          if (products.includes(item.product)) {
            Cart.findOneAndUpdate({
              user: user,
              items: {
                $elemMatch: { product: item.product }
              }
            },
              {
                $inc: { 'items.$.quantity': item.quantity }
              },
               )
               
               //.exec()
              .then(
                user => res.json(user));
              //console.log(item);
          } else {
            foundCart.items.push(item);
            foundCart.save()
            .then(items => res.json(item),
            () => res.end())
            .catch(err => console.log(err));
          }
        } else {
          Cart.create({
            user: user,
            items: [item],
          })
            .then(
              items => res.json(item));
            console.log(item);
            // User.findById(req.body.user)
            // .then((foundUser) => {
            //   foundUser.orders = foundUser.orders.concat([item]
            //     );
            //   foundUser.save(() => res.end());
            // });
        }
      });
  });
  
// @route   GET api/cart/all
// @desc    Get all cart
// @access  Public
  router.get('/all', (req, res) => {
    Cart.find()
    .populate('items.product')
    .populate('user')
    .exec((err, cart) => {
      if (!cart) {
        return res.send(null);
      }
  
      res.send(cart);
    });
  });

  // @route   GET api/cart/carts
// @desc    Get all cart
// @access  Public
router.get('/carts', (req, res) => {
  Cart.findOne()
  .select('items')
  //.populate('items.product')
  //.populate('user')
  .exec((err, cart) => {
    if (!cart) {
      return res.send(null);
    }

    res.json(cart);
  });
});
  
// @route   PUT api/cart/update
// @desc    update cart by id 
// @access  public
  router.put('/update',  (req, res) => {
    Cart.findById(req.body.cartId)
      .then((foundCart) => {
        foundCart.items = foundCart.items.filter((item) => item._id != req.body.itemId);
        foundCart.save(() => res.end());
      });
  });

// @route   DELETE api/cart/delete/
// @desc    delete cart
// @access  public
  router.delete('/delete', (req, res) => {
    Cart.findOneAndDelete()
      .then(() => res.end())
      .catch((err) => res.send(err));
  });

module.exports = router;