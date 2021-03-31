const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Forbidden('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (err) {
    throw new Forbidden('Необходима авторизация');
  }

  req.user = payload;

  next();
};

module.exports = auth;