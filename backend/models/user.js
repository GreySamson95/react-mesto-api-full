const mongoose = require('mongoose');

const regex = /https?:\/\/[www]?[a-z0-9/.-]+#?/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Какой то USER',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь моего сайта',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://w7.pngwing.com/pngs/109/994/png-transparent-teacher-student-college-school-education-avatars.png',
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
