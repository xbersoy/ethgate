const txService = require('../services/transaction')

exports.createAndSend = async (requestBody) => {
    const {senderKey, address, amount} = requestBody;
    const txObject = await txService.brodcastTransaction(senderKey, address, amount);
    return txObject;
};

exports.getTransactionsBetweenTwoBlocks = async (requestParameters) => {
    const {startBlock, endBlock} = requestParameters;
    const transactions = await txService.getTransactionsBetweenTwoBlocks(startBlock, endBlock);
    return transactions;
};