const {Card} = require('./../models/card');

exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))

}

exports.createCard = (req, res) => {
  console.log(req.user._id)
  const owner = req.user._id
  const { name, link } = req.body;
  Card.create({name, link, owner})
    .then(card => res.send({ data: card }))

}

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))

}

exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
}

exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
}
