const mongoose = require('mongoose');

const regex = /https?:\/\/[www]?[a-z0-9/.-]+#?/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введите корректный URL',
    },
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
