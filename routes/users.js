const express = require('express');
const { getUsers, getUserById, createUser, updateProfileInfo, updateProfileAvatar } = require('../controllers/users');
const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfileInfo);
router.patch('/me/avatar', updateProfileAvatar);

module.exports = router;


