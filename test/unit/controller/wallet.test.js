const walletController = require('../../../controllers/wallet');
const chai = require('chai');
const { expect } = chai;

describe('Wallet Controller', () => {
    describe('/wallet/create', () => {
        it('should return private key and address values of generated wallet', async () => {
            const returnValue = await walletController.create();
            expect(returnValue.privateKey).to.be.a('string');
            expect(returnValue.address).to.be.a('string');
            expect(returnValue).to.be.an('object');
        });
    });
});