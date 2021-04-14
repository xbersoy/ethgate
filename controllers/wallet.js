const walletService = require('../services/wallet');

exports.create = async () => {
    const createdWallet = await walletService.createWallet();
    return createdWallet;
};