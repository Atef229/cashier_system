const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const moment = require('moment');
var {url}=require("../../config/config");

// Load User model
const Product = require('../../models/Product');

// Load Input Validation
const validateAddInput = require('../../validation/add-product');
const { log } = require('console');

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Products Works' }));

// @route   POST api/product/add
// @desc    add product
// @access  Public
var storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, __dirname +'/../../public/uploads');
    },
    filename: (request, file, callback) => {
   
      callback(null, "product-img" + uuid.v1()+path.extname(file.originalname))
    }

    //filename:
  });
  //console.log(filename);
  
  var upload = multer({ storage: storage })
  let file = upload.single('Image')
  
  router.post('/add',file, (req, res) => {
          const { errors, isValid } = validateAddInput(req.body);
  
          // Check Validation
          if (!isValid) {
         return res.status(400).json(errors);
           }
          let image = req.file.Image ? '/uploads/' +req.file.Image.filename : null
      
          Product.findOne({product_id: req.body.product_id}).then(product => {
            if (product) {
                
               errors.product_id = 'Product ID already Taken';
              return res.status(400).json(errors);
            } else {
            // let product_id=parseInt((Math.random() * 10000), 10);
              const newProduct = new Product({
                product_id:req.body.product_id,
                name: req.body.name,
                price: req.body.price,
                Wholesale_price: req.body.Wholesale_price,
                quantity: req.body.quantity,
                image: `${url}`+'/uploads/'+ req.file.filename,
                //image:req.file.path,
                Created_at:moment().format('L'+' '+'LTS')
              });
               //console.log(image);
                  newProduct
                    .save()
                    .then(product => res.json(product))
                    .catch(err => console.log(err));
            }
          });
        });

// @route   PUT api/product/update/:product_id
// @desc    update product by id 
// @access  public

router.put('/update/:product_id', upload.single('Image'), function (req, res) {
 
    Product.findOne({ product_id: req.params.product_id })
       .then(product => {
         if (!product) {
           res.status(404).json('product not found');
         }else
         if(req.files){
           user = req.params.name,
           req.params.product_id,
           req.params.price,
           req.params.quantity,
           image = req.file.path;
  
           Product.findOneAndUpdate({product_id: req.params.product_id}
           ,{image}, {new: true},
            function (err, product) {
             res.status(200).send(product);
             
         });
       }else
       Product.findOneAndUpdate({product_id: req.params.product_id}
        ,req.body, {new: true},
         function (err, product) {
          res.status(200).send(product);;
       });
       })
   });

   // @route   GET api/product/all
// @desc    Get all product
// @access  Public
router.get('/all', (req, res) => {
     const errors = {};
    // sort by alphabetical, descending
     Product.find().sort({ name: -1 })// sort by Created_at, descending
       .then(product => {
         if (!product) {
           return res.status(404).json({ product: 'There are no product' });
         }
   
         res.json(product);
       })
       .catch(err => res.status(404).json({ product: 'There are no product' }));
   });

// @route   GET api/product/:product_id
// @desc    Get product by product ID
// @access  Public
router.get('/:product_id', (req, res) => {
    const errors = {};
  
    Product.find({ product_id: req.params.product_id })
      .then(product => {
        if (product==0) {
          errors.product_id = 'No Product Found';
          res.status(404).json(errors);
        }
  
        res.json(product);
      })
      .catch(err =>
        res.status(404).json({ product: 'No Product Found' })
      );
  
  });
  // @route   GET api/product/:_id
// @desc    Get product by product object ID
// @access  Public
router.get('/products/:_id', (req, res) => {
  const errors = {};

  Product.find({ _id: req.params._id })
    .then(product => {
      if (product==0) {
        errors._id = 'No Product Found';
        res.status(404).json(errors);
      }

      res.json(product);
    })
    .catch(err =>
      res.status(404).json({ product: 'No Product Found' })
    );

});

  // @route   DELETE api/product/delete/:product_id
// @desc    delete product
// @access  public
router.delete('/delete/:product_id', function (req, res) { 
    Product.findOne({ product_id: req.params.product_id })
    .then(product => {
      if (!product) {
        res.status(404).json('product not found');
      }else 
    Product.findOneAndRemove({product_id: req.params.product_id},
    function (err) {
    if (err) return res.status(500).send("There was a problem deleting the product.");
    res.status(200).send("product was deleted.");
  });
    })
  });

module.exports = router;