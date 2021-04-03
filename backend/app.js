require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const { login, createUser } = require('./controllers/users');
const registerValidator = require('./middlewares/validators/register');
const loginValidator = require('./middlewares/validators/login');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFound = require('./errors/NotFound');

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const allowedCors = [
  'https://greysamson-mesto.students.nomoredomains.icu',
  'https://greysamson-mesto.students.nomoredomains.icu',
  'http://greysamson-mesto.students.nomoredomains.icu',
  'http://localhost:3001',
  'http://localhost:3000',
];
const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 204,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
const router = require('./routes');

app.post('/signin', loginValidator, login);
app.post('/signup', registerValidator, createUser);
app.use('/', router);

app.use('/users', router);

app.use(errorLogger);

app.use(errors());

app.use('*', (req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

app.use((err, req, res, next) => {
  next();
  if (err.statusCode === undefined) {
    const { statusCode = 500, message } = err;
    return res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
  }
  return res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT);
