const router = require('express').Router();
const {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const idValidator = require('../middlewares/validators/id');
const createCardValidator = require('../middlewares/validators/createCard');

router.get('/cards', getCards);

router.get('/cards/:_id', idValidator, getCard);

router.post('/cards', createCardValidator, createCard);

router.delete('/cards/:cardId', idValidator, deleteCard);

router.put('/cards/:cardId/likes', idValidator, likeCard);

router.delete('/cards/:cardId/likes', idValidator, dislikeCard);

module.exports = router;
