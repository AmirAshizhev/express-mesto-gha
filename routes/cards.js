const express = require('express');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardValidator, deleteCardValidator, likeValidator } = require('../middlewares/validators');

const router = express.Router();

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:cardId', deleteCardValidator, deleteCard);
router.put('/:cardId/likes', likeValidator, likeCard);
router.delete('/:cardId/likes', likeValidator, dislikeCard);

module.exports = router;
