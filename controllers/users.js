const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

exports.updateProfileInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

exports.updateProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).send({ message: 'Переданы невалидные данные' });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанномое email не найден' });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            const token = jwt.sign({ _id: user._id }, 'some-secret-key');
            return res.send({ token });
          }
          return res.status(401).send({ message: 'Переданы некорректные данные' });
        });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
