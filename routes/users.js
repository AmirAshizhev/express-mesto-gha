const express = require('express');

const {
  getUsers, getUserById, updateProfileInfo, updateProfileAvatar, getCurrentUser,
} = require('../controllers/users');
const { getUserByIdValidator, updateProfileInfoValidator, updateProfileAvatarValidator } = require('../middlewares/validators');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserByIdValidator, getUserById);
router.patch('/me', updateProfileInfoValidator, updateProfileInfo);
router.patch('/me/avatar', updateProfileAvatarValidator, updateProfileAvatar);

module.exports = router;
