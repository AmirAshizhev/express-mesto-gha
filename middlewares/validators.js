const { celebrate, Joi } = require('celebrate');

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24),
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
    avatar: Joi.string().uri(),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
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
    avatar: Joi.string().uri(),
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
};
