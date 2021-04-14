const Web3 = require('web3');
const CreateClient = require('../ethClient');
const web3 = CreateClient(Web3);

module.exports.createWallet = async () => {
    
    try {
        let wallet = await web3.eth.accounts.wallet.create(1);
        let responseObject = {
            "privateKey": wallet[0].privateKey,
            "address": wallet[0].address
        };
        return responseObject;
    } catch (error) {
        throw error;
    }
}