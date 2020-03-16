const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beachSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    img: { type: String },
    temp: { type: Number, min: 0 },
    qty: {type: Number, min:0}
});

// Were setting up a collection(model) in mongoose, and were naming it 'Fruit',and were applying the schema to it so people don't do stupid stuff to it,'fruit' doesn't need to be capitalized or plural, its just convention
const Beaches = mongoose.model('BeachCollection', beachSchema);

module.exports = Beaches; 
