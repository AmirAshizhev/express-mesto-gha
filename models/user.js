const mongoose = require('mongoose');
const validator = require('validator');
const { regular } = require('../middlewares/validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',

  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return regular.test(v);
      },
      message: 'Не валидная ссылка на картинку для аватара',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Не валидный адрес электронной почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports.User = mongoose.model('user', userSchema);
