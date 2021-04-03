const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

const getCards = (req, res, next) => {
  Card.find({}).populate('owner')
    .then((cards) => {
      if (!cards) {
        throw new NotFound('Карточки не найдены');
      }
      res.status(200).send(cards);
    })
    .catch(next);
};

const getCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Нет карточки с таким id');
      }
      return res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest('Карточка не найдена');
      }
      throw err;
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Введены некорректные данные');
      }
      throw err;
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFound('Нет карточки с таким id'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Нет доступа');
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .then((delcard) => res.send({ delcard }))
          .catch(next);
      }
    })
    .catch((err) => {
      throw err;
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Нет карточки с таким id');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      throw err;
    })
    .catch((err) => {
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Нет карточки с таким id');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      throw err;
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
