const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, getMe, updateAvatar,
} = require('../controllers/users');
const userIdValidator = require('../middlewares/validators/userId');
const updateAvatarValidator = require('../middlewares/validators/updateAvatar');
const updateUserValidator = require('../middlewares/validators/updateUser');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:_id', userIdValidator, getUser);

router.post('/users', createUser);

router.patch('/users/me', updateUserValidator, updateUser);

router.patch('/users/me/avatar', updateAvatarValidator, updateAvatar);

module.exports = router;
