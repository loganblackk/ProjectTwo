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
//*New route
app.get('/new', (req, res) => {
  res.render('new.ejs')
})

//*show route
app.get('/:id', (req, res) => {
  Beaches.findById(req.params.id, (error, item) => {
    res.render('show.ejs', { beaches: item })
  })
})

//*Index route
app.get('/', (req, res) => {
  Beaches.find({}, (error, items) => {
    res.render('index.ejs', { beaches: items })
  })
}) 

// *edit route
app.get('/:id/edit', (req, res) => {
  Beaches.findById(req.params.id, (err, items) => {
    res.render('edit.ejs', { beaches: items });
  });
});

//* created route
app.post('/', (req, res) => {
Beaches.create(req.body, (error, createdBeach) => {
    res.redirect('/beaches');
  })
})

//*remove route
app.delete('/:id', (req, res) => {
Beaches.findByIdAndRemove(req.params.id, (err, data) => {
  res.redirect('/beaches');
});
});

//*edit qty route
app.put('/:id/qty', (req, res) => {
  Beaches.findByIdAndUpdate(req.params.id,{$inc: {qty:+1}}, 
    (err, updatedBeachess) => {
      res.redirect(`/beaches/${req.params.id}`)
    });
});


app.put('/:id', (req, res) => {
Beaches.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBeaches) => {
  res.redirect(`/beaches/${req.params.id}`)
});
})


module.exports = router;


//listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)})

  
// mongoose.connect('mongodb://localhost:27017/beaches', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
//   console.log('The connection with mongod is established')
// })




