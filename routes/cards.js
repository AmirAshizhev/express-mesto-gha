const express = require('express');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardValidator, deleteCardValidator, addLikeValidator } = require('../middlewares/validators');

const router = express.Router();

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:cardId', deleteCardValidator, deleteCard);
router.put('/:cardId/likes', addLikeValidator, likeCard);
router.delete('/:cardId/likes', deleteCardValidator, dislikeCard);

module.exports = router;
