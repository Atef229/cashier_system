const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

// Load User model
const Admin = require('../../models/Admin');

// Load Input Validation
const validateRegisterInput = require('../../validation/admin-register');
const validateLoginInput = require('../../validation/admin-login');

// @route   GET api/admin/test
// @desc    Tests admins route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Admins Works' }));

// @route   POST api/admin/register
// @desc    Register admin
// @access  Public 
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
   return res.status(400).json(errors);
     }

    Admin.findOne({username: req.body.username}).then(admin => {
      if (admin) {
          
        errors.username = 'Username already Taken';
        return res.status(400).json(errors);
      } else {

        const newUser = new Admin({
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

// @route   POST api/admin/login
// @desc    Login admin / Returning JWT Token
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
    Admin.findOne({ username }).then(user => {
      // Check for user
      if (!user) {
        errors.username = 'Admin not found';
        return res.status(404).json(errors);
      }
  
      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
  
         // create a token
        var token = jwt.sign({ id: user._id , username: user.username}, keys.secretOrKey, {
        expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
  
        }else {
          return res.status(400).json({password:'wrong password'});
        }
      });
  });
  });


module.exports = router;