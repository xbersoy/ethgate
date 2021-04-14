const router = require('express').Router();
const walletController = require('../controllers/wallet');
const errorHandler = require('../middlewares/errorHandler');

/* 
  Returns the created wallet
*/
router.get(
  '/wallet/create',
  async (req, res, next) => {
    errorHandler.async(req, res, next, walletController.create());
  },
);

module.exports = router;