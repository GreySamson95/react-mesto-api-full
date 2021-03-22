const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/errorUrl');

app.use((req, res, next) => {
  req.user = {
    _id: '6034ecd3c6e55d143c8dc6a7',
  };

  next();
});

app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use('/', errorRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`On port ${PORT}`);
});
