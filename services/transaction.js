const Tx = require('ethereumjs-tx');
const privateKeyToAddress = require('ethereum-private-key-to-address');
const Web3 = require('web3');
const ethClient = require('../ethClient');
const web3 = ethClient(Web3);

module.exports.brodcastTransaction = async (senderKey, toAddress, amount) => {
    try {
        const privateKey = Buffer.from(senderKey.substring(2), 'hex');
        const senderAddress = privateKeyToAddress(senderKey);
        const nonce = await web3.eth.getTransactionCount(senderAddress, 'pending');
        const rawTx = {
            nonce: web3.utils.toHex(nonce),
            to: toAddress,
            gasPrice: web3.utils.toHex(20000000000),//web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(800000),//web3.utils.toHex(lastBlock.gasLimit),
            value: web3.utils.toHex(amount)
        }

        const tx = new Tx(rawTx, { chain: 'goerli' });

        tx.sign(privateKey);

        const serializedTx = tx.serialize();

        const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        return { txHash: receipt.transactionHash };
    } catch (error) {
        throw error;
    }
}

module.exports.getTransactionsBetweenTwoBlocks = async (startBlock, endBlock) => {
    const endIndex = endBlock === undefined ? await web3.eth.getBlockNumber() : endBlock;
    const batch = new web3.eth.BatchRequest();
    const blockNumbers = getBlockNumbers(startBlock, endIndex);
    let counter = 0;
    var allBlocksTransactions = [];
    let currentBlocksTransactions = [];

    await new Promise(function (resolve, reject) {

        blockNumbers.forEach(blockNumber => {
            batch.add(
                web3.eth.getBlock.request(blockNumber, true, (error, data) => {
                    if (error) return reject(error);
                    counter++;

                    currentBlocksTransactions = data.transactions.map(transaction => {
                        return {
                            from: transaction.from,
                            to: transaction.to,
                            amount: web3.utils.fromWei(transaction.value, 'ether'),
                            token: 'ETH', // TODO: duzeltilmeli
                            timestamp: data.timestamp,
                            blockNumber: transaction.blockNumber
                        }
                    });
                    allBlocksTransactions = [...allBlocksTransactions, ...currentBlocksTransactions];

                    if (counter === blockNumbers.length) resolve();
                })
            )
        });

        batch.execute()
    });

    return allBlocksTransactions;
}

function getBlockNumbers(start, end) {
    var blockNumbers = [];
    for (let i = parseInt(start, 10); i <= parseInt(end, 10); i++) {
        blockNumbers.push(i);
    }
    return blockNumbers;
}