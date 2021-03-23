const router = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, getMe, updateAvatar,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

router.get('/users', getUsers);

router.get('/users/me', getMe);

router.get('/users/:_id', getUser);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

router.use('/users', authMiddleware);

module.exports = router;
