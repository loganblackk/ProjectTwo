const express = require('express');
const app = express();
require('dotenv').config();
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;

app.use(express.urlencoded({ extended: true }));
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




