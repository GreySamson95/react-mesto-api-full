const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
// const path = require('path');
const registerValidator = require('./middlewares/validators/register');
const errorHandler = require('./middlewares/errorHandler');
const { login, createUser } = require('./controllers/users');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/errorUrl');

// app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use('/', errorRouter);

app.post('/signin', login);
app.post('/signup', registerValidator, createUser);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`On port ${PORT}`);
});
