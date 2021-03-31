const router = require('express').Router();
const {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const idValidator = require('../middlewares/validators/id');
const createCardValidator = require('../middlewares/validators/createCard');

router.get('/', getCards);

router.get('/:_id', idValidator, getCard);

router.post('/', createCardValidator, createCard);

router.delete('/:cardId', idValidator, deleteCard);

router.put('/:cardId/likes', idValidator, likeCard);

router.delete('/:cardId/likes', idValidator, dislikeCard);

module.exports = router;
