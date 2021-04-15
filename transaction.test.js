const txController = require('../../../controllers/transaction');
const chai = require('chai');
const { expect } = chai;

describe('Transaction Controller', () => {
    describe('/transaction/createAndSend', () => {
        it('should return txHash value property in an object', async () => {
            const returnValue = await txController.createAndSend(
                {
                    "senderKey": "0xf0612c2b8950ecbf5bb34661dab5c2579c974fdf62422d0a045dc5a19b58c371",
                    "address": "0x9D9dcE4cb5B796Dc6E3d00457D276Abe81c8491c",
                    "amount": 2
                }
            );
            expect(returnValue.data).to.be.an('object');
            expect(returnValue.success).to.be.an('boolean');
            expect(returnValue).to.be.an('object');
        });
    });

    describe('/transaction/getTransactionsBetweenTwoBlocks', () => {
        it('should return txHash value property in an object', async () => {
            const returnValue = await txController.getTransactionsBetweenTwoBlocks(
                {
                    "senderKey": "0xf0612c2b8950ecbf5bb34661dab5c2579c974fdf62422d0a045dc5a19b58c371",
                    "address": "0x9D9dcE4cb5B796Dc6E3d00457D276Abe81c8491c",
                    "amount": 2
                }
            );
            expect(returnValue.data).to.be.an('object');
            expect(returnValue.success).to.be.an('boolean');
            expect(returnValue).to.be.an('object');
        });
    });
});