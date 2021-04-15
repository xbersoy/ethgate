const txController = require('../../../controllers/transaction');
const chai = require('chai');
const { expect } = chai;

describe('Transaction Controller', () => {
    describe('/transaction/createAndSend', () => {
        it('should return txHash value property in an object', async function () {
            this.timeout(0);
            const returnValue = await txController.createAndSend(
                {
                    "senderKey": "0xf0612c2b8950ecbf5bb34661dab5c2579c974fdf62422d0a045dc5a19b58c371",
                    "address": "0x9D9dcE4cb5B796Dc6E3d00457D276Abe81c8491c",
                    "amount": 2
                }
            );
            expect(returnValue).to.be.an('object');
            expect(returnValue.txHash).to.be.a('string');
        });
    });

    describe('/transaction/getTransactionsBetweenTwoBlocks', () => {
        it('should return transaction details between given blocks', async function () {
            this.timeout(0);
            const returnValue = await txController.getTransactionsBetweenTwoBlocks(
                {startBlock: 4613300, endBlock: 4613660}
            );
            expect(returnValue).to.be.an('array');
            expect(returnValue[0].from).to.be.a('string');
            expect(returnValue[0].to).to.be.a('string');
            expect(returnValue[0].amount).to.be.a('string');
            expect(returnValue[0].token).to.be.a('string');
            expect(returnValue[0].timestamp).to.be.an('number');
            expect(returnValue[0].blockNumber).to.be.an('number');
        });
    });
});