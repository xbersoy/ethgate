const txService = require('../services/transaction')

exports.createAndSend = async (req) => {
    const {senderKey, address, amount} = req.body;
    const txObject = await txService.brodcastTransaction(senderKey, address, amount);
    return txObject;
};

exports.getTransactionsBetweenTwoBlocks = async (req) => {
    const {startBlock, endBlock} = req.query;
    const transactions = await txService.getTransactionsBetweenTwoBlocks(startBlock, endBlock);
    return transactions;
};