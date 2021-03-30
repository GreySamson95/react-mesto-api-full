const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const regex = /https?:\/\/[www]?[a-z0-9/.-]+#?/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введите корректный URL',
    },
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    select: false,
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
