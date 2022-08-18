const express = require('express');
const {Joi, celebrate } = require('celebrate');

const {
  getUsers, getUserById, updateProfileInfo, updateProfileAvatar, getCurrentUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);
router.patch('/me', updateProfileInfo);
router.patch('/me/avatar', updateProfileAvatar);

module.exports = router;
