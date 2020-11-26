const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

// Load User model
const User = require('../../models/User');

// Load Input Validation
 const validateRegisterInput = require('../../validation/user-register');
 const validateLoginInput = require('../../validation/user-login');

// @route   GET api/user/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   POST api/user/register
// @desc    Register user
// @access  Public 
router.post('/register', (req, res) => {
        const { errors, isValid } = validateRegisterInput(req.body);
    
        // Check Validation
        if (!isValid) {
       return res.status(400).json(errors);
         }
    
        User.findOne({username: req.body.username}).then(user => {
          if (user) {

            errors.username = 'Username already Taken';
            return res.status(400).json(errors);
          } else {
            const newUser = new User({
              username: req.body.username,
              password: req.body.password,
              Created_at:moment().format('L'+' '+'LTS')
            });
    
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
              });
            }); 
          }
        });
      });

      // @route   POST api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const username = req.body.username;
    const password = req.body.password;
  
    // Find user by username
    User.findOne({ username }).then(user => {
      // Check for resident
      if (!user) {
        errors.username = 'User not found';
        return res.status(404).json(errors);
      }
  
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
  
         // create a token
        var token = jwt.sign({ id: user._id , username: user.username }, keys.secretOrKey, {
        expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
  
        }else {
          return res.status(400).json({password:'wrong password'});
        }
      });
  });
  });

// @route   GET api/user/all
// @desc    Get all user
// @access  Public
router.get('/all', (req, res) => {
    // const errors = {};
     User.find().sort({ name: 1 })// sort by alphabetical, descending
       .then(user => {
         if (user==0) {
           return res.status(404).json({ user: 'There are no user' });
         }
   
         res.json(user);
         
       })
       .catch(err => res.status(404).json({ user: 'There are no user' }));
   });

   router.put('/update/password/:_id', function (req, res) {
    const errors = {};
    User.findOne({ _id: req.params._id })
      .then(user => {
        if (!user) {
          res.status(404).json('user not found');
        }else
        User.findOneAndUpdate({_id: req.params._id}
          ,req.body, {new: true},
          function (err, user) {
            console.log(user.password);
            if(user.password.length<6){
              errors.password='Password must be at least 6 characters'
              res.status(404).json(errors);
            }else{
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              
              user
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
                  res.status(200).send(user);
              });
          });
        }
        });
      })
  });

// @route   DELETE api/user/delete/:user_id
// @desc    delete user
// @access  public
router.delete('/delete/:_id', function (req, res) { 
    User.findOne({ _id: req.params._id })
    .then(user => {
      if (!user) {
        res.status(404).json('user not found');
      }else 
    User.findOneAndRemove({_id: req.params._id},
    function (err) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User was deleted.");
  });
  })
  });

module.exports = router;