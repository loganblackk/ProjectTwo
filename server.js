const express = require('express');
const app = express();
require('dotenv').config();

const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;
const mongoURI = process.env.MONGODB_URI

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


const beachesController = require('./controllers/beachesController.js')
app.use('/beaches', beachesController)


const dbupdateobject = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
// Connect to Mongo
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);
// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected! '));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
    console.log('Connection made!');
});
app.get('/', (req, res) => {
    res.send('your application is working');
});


//listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)})

  
// mongoose.connect('mongodb://localhost:27017/beaches', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
//   console.log('The connection with mongod is established')
// })



























//! My old data
// app.get('/products/seed', (req, res) => {
//   Products.create (     
//     [
//     {
//       name: 'Koala',
//       description: 'Koala Bear',
//       img: 'https://imgur.com//1p5nKyZ.png',
//       price: 5,
//       qty: 99
//     },
//     {
//         name: 'Kangaroo',
//         description: 'Roo Daddy',
//         img: 'https://imgur.com/hDkHeKi.jpg',
//         price: 25,
//         qty: 0
//     },
//     {
//         name: 'Platypus',
//         description: 'Bizarre frankenstein creature',
//         img: 'https://imgur.com/DGmwtUv.jpg',
//         price: 7000,
//         qty: 1
//     }
//     ],
//     (err, data) => {
//       console.log(err,data)
//       res.redirect('/products')
//     }
// )});





//! 7 RESTful Routes
//? HTTP Methods to remember
/*
# GET- for getting data /reading/retrieving
#POST- for creating data
#PUT - for updating/editing data
#DELETE - for deleting data from the db
 */
// //*Index route
// app.get('/products', (req, res) => {
//   Products.find({}, (error, items) => {
//     res.render('index.ejs', { products: items })
//   })
// })

// //*New route
// app.get('/products/new', (req, res) => {
//   res.render('new.ejs')
// })

// //*show route
// app.get('/products/:id', (req, res) => {
//   Products.findById(req.params.id, (error, item) => {
//     res.render('show.ejs', { products: item })
//   })
// })

// //*edit route
// app.get('/products/:id/edit', (req, res) => {
//   Products.findById(req.params.id, (err, items) => { //find the product
//     res.render('edit.ejs', { products: items });
//   });
// });

// //* created route
// app.post('/products/', (req, res) => {
//   Products.create(req.body, (error, createdProduct) => {
//     res.redirect('/products');
//   })
// })

// //*update route
// app.put('/products/:id', (req, res) => {
//   Products.findByIdAndUpdate(req.params.id, req.body,
//     (err, updatedProducts) => {
//       res.redirect('/products');
//     });
// });

// //*remove route
// app.delete('/products/:id', (req, res) => {
//   Products.findByIdAndRemove(req.params.id, (err, data) => {
//     res.redirect('/products');
//   });
// });



