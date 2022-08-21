const { celebrate, Joi } = require('celebrate');

const regular = /https?:\/\/(www\.)?([0-9A-Za-z-._~:/?#@!$&()*+,;=[\]]{2,265})\.[A-Za-z]{2,6}\b([A-Za-z-._~:/?#@!$&()*+,;=[\]]*)/;

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

const updateProfileInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateProfileAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(regular)),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(regular)),
  }),
});

const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(regular)),
  }),
});

const likeValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  getUserByIdValidator,
  updateProfileInfoValidator,
  updateProfileAvatarValidator,
  createCardValidator,
  deleteCardValidator,
  loginValidator,
  createUserValidator,
  likeValidator,
  regular,
};
