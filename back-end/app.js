const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const registerValidator = require('./middlewares/validators/register');
const loginValidator = require('./middlewares/validators/login');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const { NotFound } = require('./errors');

const app = express();
const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://greysamson-mesto.students.nomoredomains.icu',
  'https://www.greysamson-mesto.students.nomoredomains.icu',
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

app.use('*', cors(corsOptions));

// app.use((req, res, next) => {
//   const { origin } = req.headers;

//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   next();
// });

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidator, login);
app.post('/signup', registerValidator, createUser);
app.use(auth);
app.use('/', router);
app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(errorLogger);

app.use(() => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`On port ${PORT}`);
});
