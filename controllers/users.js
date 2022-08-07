// const BadRequest = require('../errors/badRequest')
const {User} = require('./../models/user')

exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))

}

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(()=>{
      res.status(404).send({message: 'Пользователь не найден'})
    })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });

}

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))

}

exports.updateProfileInfo = (req, res) => {
  // console.log(req.user._id)
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about})
    .orFail(()=>{
      res.status(400).send({message: 'Пользователь не найден'})
      return
    })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

exports.updateProfileAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar})
    .then(user => res.send({ data: user }))
}


