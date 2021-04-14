const router = require('express').Router();
const txController = require('../controllers/transaction');
const errorHandler = require('../middlewares/errorHandler');

/* 
  This endpoint creates transaction object with given parameters. Signs and sends tx to the Network (Goerli Testnet) 
*/
router.post(
  '/transaction/createAndSend',
  async (req, res, next) => {
    errorHandler.async(req, res, next, txController.createAndSend(req));
  },
);

/* 
  TODO: 
*/
router.get(
  '/transaction/getTransactionsBetweenTwoBlocks',
  async (req, res, next) => {
    errorHandler.async(req, res, next, txController.getTransactionsBetweenTwoBlocks(req));
  },
);

module.exports = router;