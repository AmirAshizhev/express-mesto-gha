const {User} = require('./../models/user')

exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(()=>{
      res.status(500).send({message: 'Произошла ошибка на сервере'})
    })
}

exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user){
        res.status(404).send({message: 'Пользователь по указанному _id не найден'})
        return
      }
      res.send({ data: user })
    })
    .catch((err) => {
      if(err.name === 'CastError'){
        res.status(400).send({message: 'Переданы некорректные данные'})
        return
      }
      res.status(500).send({message: 'Произошла ошибка на сервере'})
    });

}

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные в методы создания пользователя' });
        return
      }
      res.status(500).send({ message: 'Произошла ошибка' });
      return
    })
};

exports.updateProfileInfo = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about})
    .then(user => {
      if (!user){
        res.status(404).send({message: 'Пользователь по указанному _id не найден'})
        return
      }
      res.send({ data: user })
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
}

exports.updateProfileAvatar = (req, res) => {
  const {avatar} = req.body;
  User.findByIdAndUpdate(req.user._id, {avatar})
    .then(user => {
      if (!user){
        res.status(404).send({message: 'Пользователь по указанному _id не найден'})
        return
      }
      res.send({ data: user })
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные в методы обновления профиля' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
}


