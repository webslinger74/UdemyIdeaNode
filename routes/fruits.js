const express = require('express');

const fruitRouter = express.Router();
const {
  getIndividualFruitPage,
  addNewFruit,
  deleteIndividualFruit,
  getInputAFruitPage,
  getAllFruitsPage,
} = require('../controllers/fruitController');

// fruitRouter.route('/input').get(getInputAFruitPage()).post(addNewFruit());

fruitRouter.post('/input', addNewFruit());
fruitRouter.get('/input/:id', getIndividualFruitPage());
fruitRouter.post('/delete', deleteIndividualFruit());
fruitRouter.get('/input', getInputAFruitPage());
fruitRouter.get('/', getAllFruitsPage());

module.exports = fruitRouter;
