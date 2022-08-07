const {Card} = require('./../models/card');

exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
}

exports.createCard = (req, res) => {
  console.log(req.user._id)
  const { name, link } = req.body;
  Card.create({name, link})
    .then(card => res.send({ data: card }))

}

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(user => res.send({ data: user }))
}

