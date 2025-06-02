const mongoose = require('mongoose');

const ChickenSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: { type: Number, default: 0 },
  comments: [{ text: String, date: Date }]
});

module.exports = mongoose.model('Chicken', ChickenSchema);