const Web3 = require('web3');
const CreateClient = require('../ethClient');
const web3 = CreateClient(Web3);

module.exports.createWallet = async () => {
    
    try {
        const wallet = await web3.eth.accounts.wallet.create(1);
        const responseObject = {
            "privateKey": wallet[0].privateKey,
            "address": wallet[0].address
        };
        return responseObject;
    } catch (error) {
        throw error;
    }
}