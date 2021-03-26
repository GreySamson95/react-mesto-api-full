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
const { NotFound } = require('./errors');

const app = express();
const { PORT = 80 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors());
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

app.use('/', router);
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(errorLogger);

app.use(() => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`On port ${PORT}`);
});
