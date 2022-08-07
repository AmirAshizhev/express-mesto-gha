const {User} = require('./../models/user')

exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
}

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))

  // res.send(users.find(({_id}) => _id === req.params.id))
}

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))

}

