const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  link:{
    type: String,
    require: true,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  likes:[{
    // так ли обозначатьб?
    type: mongoose.Schema.Types.ObjectId,
    default: []
  }],
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports.Card = mongoose.model('card', cardSchema);