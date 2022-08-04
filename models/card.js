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
    type: ObjectId,
    require: true,
  },
  likes:[{
    type: ObjectId,
    default: []
  }],
  createdAt:{
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);