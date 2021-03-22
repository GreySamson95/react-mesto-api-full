const User = require('../models/user');

const checkDataError = (res, err) => {
  if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
    return res.status(400).send({ message: `Переданы некоректные/ неполные данные: ${err}` });
  }
  return res.status(500).send({ message: `Ошибка на стороне сервера: ${err}` });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => { res.send(users); })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Нет пользователя с таким id' });
      } else {
        res.status(500).send({ message: 'Ошибка на стороне сервера' });
      }
    });
};

const postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => { res.status(200).send({ user }); })
    .catch((err) => checkDataError(res, err));
};

const getMe = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => { res.send({ data: user }); })
    .catch((err) => checkDataError(res, err));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => { res.send({ data: user }); })
    .catch((err) => checkDataError(res, err));
};

module.exports = {
  getUsers, getUser, postUser, getMe, updateUser, updateAvatar,
};
