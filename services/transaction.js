const Web3 = require('web3');
const ethClient = require('../ethClient');
const { async } = require('../middlewares/errorHandler');
const web3 = ethClient(Web3);
const Tx = require('ethereumjs-tx');


const createTransaction = async (toAddress, amount) => {

    var nonce = await web3.eth.getTransactionCount('0x1B5fB633A957AA72ACD8DBbE2e9d45bF45845011', 'pending');

    var rawTx = {
        nonce: web3.utils.toHex(nonce),
        to: toAddress,
        gasPrice: web3.utils.toHex(20000000000),
        gasLimit: web3.utils.toHex(800000),
        value: web3.utils.toHex(amount)
    }

    return rawTx;
}

seriliazeTransaction = (txObject) => {
    return txObject.serialize();
}

signTransaction = (txObject, senderPK) => {
    return txObject.sign(senderPK);
}

sendTransaction = async (txObject) => {
    const sentTx = await web3.eth.sendSignedTransaction('0x' + txObject.toString('hex'));
    return sentTx;
}


module.exports.brodcastTransaction = async (senderKey, toAddress, amount) => {
    try {

        var privateKey = Buffer.from(senderKey.substring(2), 'hex');
        var nonce = await web3.eth.getTransactionCount('0x1B5fB633A957AA72ACD8DBbE2e9d45bF45845011', 'pending');

        var rawTx = {
            nonce: web3.utils.toHex(nonce),
            to: toAddress,
            gasPrice: web3.utils.toHex(20000000000),//web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(800000),//web3.utils.toHex(lastBlock.gasLimit),
            value: web3.utils.toHex(amount)
        }

        var tx = new Tx(rawTx, { chain: 'goerli' });

        tx.sign(privateKey);
        var serializedTx = tx.serialize();
        var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));

        return { txHash: receipt.transactionHash };

    } catch (error) {
        throw error;
    }
}











async function checkTransactions() {
    try {
        console.log(`[*] Searching block ${block.number}...`);
        if (block && block.transactions) {
            for (let txHash of block.transactions) {
                let tx = await web3.eth.getTransaction(txHash)
                if (account === tx.to.toLowerCase()) {
                    console.log(`[+] Transaction found on block ${lastBlockNumber}`)
                    console.log({
                        address: tx.from,
                        value: web3.utils.fromWei(tx.value, 'ether'),
                        timestamp: new Date()
                    })
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

async function getLastBlock() {
    return await web3.eth.getBlock('latest');
}

module.exports.getTransactionsBetweenTwoBlocks = async (startBlock, endBlock) => {
    var endIndex = endBlock === undefined ? await web3.eth.getBlockNumber() : endBlock;
    var batch = new web3.eth.BatchRequest();
    var blockss = [];
    let blockNumbers = getBlockNumbers(startBlock, endIndex);
    let counter = 0;
    var total = blockNumbers.length;
    var blocks = [];

    await new Promise(function (resolve, reject) {

        blockNumbers.forEach(blockNumber => {
            batch.add(
                web3.eth.getBlock.request(blockNumber, true, (error, data) => {
                    if (error) return reject(error);
                    counter++;

                    blocks = data.transactions.map(transaction => {
                        return {
                            from: transaction.from,
                            to: transaction.to,
                            amount: web3.utils.fromWei(transaction.value, 'ether'),
                            token: 'ETH', // TODO: duzeltilmeli
                            timestamp: data.timestamp,
                            blockNumber: transaction.blockNumber
                        }
                    });
                    blockss = [...blockss, ...blocks];

                    if (counter === total) resolve();
                })
            )
        });

        batch.execute()
    });

    return blockss;
}

function getBlockNumbers(start, end) {
    var blockNumbers = [];
    for (let i = parseInt(start, 10); i <= parseInt(end, 10); i++) {
        blockNumbers.push(i);
    }
    return blockNumbers;
}
