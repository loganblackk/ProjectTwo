const express = require('express')
const router = express.Router()
const Beaches = require('../models/beaches.js')



router.get('/seed', async (req, res) => {
  const newBeaches =
  [
    {
      name: 'Fiji',
      location: 'A country in Oceania in the South Pacific',
      description: 'Fiji comprises an archipelago of more than 332 islands, 110 of which are permanently inhabited. Fiji is located about two-thirds of the way from Hawaii to New Zealand, and immediate neighbors include Vanuatu, Tonga, and Samoa.',
      img: 'https://imgur.com/jPF8IjW.jpg',
      temp: '80.5',
      qty: 905502
    },
    {
      name: 'Tahiti',
      location: 'Tahiti is the largest island in French Polynesia, the South Pacific archipelago',
      description: 'Commonly referred to as The Islands of Tahiti, French Polynesia is a collection of 118 islands and atolls scattered across an impressive nautical surface area the size of Western Europe. Still, these tiny islands—many of which remain uninhabited—make up a total landmass of only 1,600 square miles (4,100 sq. km).',
      img: 'https://imgur.com/x0qmF8L.jpg',
      temp: '80.5',
      qty: 283007
    },
    {
      name: 'Bora Bora',
      location: 'Bizarre frankenstein creature',
      description: 'Bora Bora is situated approximately 140 miles (225km) northwest of Tahiti, in the western Leeward group of the Society islands of French Polynesia. It is a rugged, volcanic, mountainous island featuring a large lagoon surrounded by beautiful coral reefs and islets.',
      img: 'https://imgur.com/6d6P8.jpg',
      temp: '80.5',
      qty: 10605
  }
  ]

  try {
    const seedItems = await Beaches.create(newBeaches)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})


//*New route
router.get('/new', (req, res) => {
  res.render('new.ejs')
})
//*show route
router.get('/:id', (req, res) => {
  Beaches.findById(req.params.id, (error, item) => {
    res.render('show.ejs', { beaches: item })
  })
})

//*Index route
router.get('/', (req, res) => {
  Beaches.find({}, (error, items) => {
    res.render('index.ejs', { beaches: items })
  })
}) 

// *edit route
router.get('/:id/edit', (req, res) => {
    Beaches.findById(req.params.id, (err, items) => {
      res.render('edit.ejs', { beaches: items });
    });
});
//* created route
router.post('/', (req, res) => {
  Beaches.create(req.body, (error, createdBeach) => {
      res.redirect('/beaches');
    })
})
//*remove route
router.delete('/:id', (req, res) => {
  Beaches.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/beaches');
  });
});
//*edit qty route
router.put('/:id/qty', (req, res) => {
  Beaches.findByIdAndUpdate(req.params.id,{$inc: {qty:+1}}, 
    (err, updatedBeachess) => {
      res.redirect(`/beaches/${req.params.id}`)
    });
});


//*update route
router.put('/:id', (req, res) => {
  Beaches.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBeaches) => {
    res.redirect(`/beaches/${req.params.id}`)
  });
})







module.exports = router;


//!! end rewind heree!!!!!!!!!!!!!!!!

