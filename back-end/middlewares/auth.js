// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors');
const { JWT_SECRET } = require('../config');
// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
  } catch (err) {
    throw new Forbidden('Необходима авторизация');
  }

  next();
};

module.exports = auth;
