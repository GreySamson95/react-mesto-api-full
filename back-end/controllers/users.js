/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { NotFound, Conflict } = require('../errors');

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
        throw new NotFound('Нет пользователя с таким id');
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFound('Нет пользователя с таким id');
      } else {
        res.status(500).send({ message: 'Ошибка на стороне сервера' });
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Пользователь уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((password) =>
      User.create({
        name, about, avatar, email, password,
      }))
    .then(({ _id, email }) => {
      res.send({ _id, email });
    })
    .catch(next);
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

const login = (req, res, next) => {

}

module.exports = {
  getUsers, getUser, createUser, getMe, updateUser, updateAvatar, login
};
