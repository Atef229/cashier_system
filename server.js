const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

 const admin = require('./routes/api/admin');
 const user = require('./routes/api/user');
 const product = require('./routes/api/product');
 const cart = require('./routes/api/cart');
 const order = require('./routes/api/order');
const expenses = require('./routes/api/expenses');
const returned = require('./routes/api/returned');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db,{ useUnifiedTopology: true ,useFindAndModify: false ,useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));




// Use Routes
 app.use('/api/admin', admin);
 app.use('/api/user', user);
 app.use('/api/product', product);
 app.use('/api/cart', cart);
 app.use('/api/order', order);
 app.use('/api/expenses', expenses);
 app.use('/api/returned', returned);

// Server static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
  //  app.use(express.static('client/build'));

  //  app.get('*', (req, res) => {
  //    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  //  });

  //  app.use(express.static('client-user/build'));

  //  app.get('*', (req, res) => {
  //    res.sendFile(path.resolve(__dirname, 'client-user', 'build', 'index.html'));
  //  });
// }

// app.use(express.static('public'));
// app.use("/*",(req,res,err)=>{
//   res.sendFile(__dirname+"/public/index.html")
// })

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));