async function checkBlocks(start, end) {
    
    if (end === undefined) {
        end = await getLatestBlockNumber();
    }

    for (let i = start; i < end; i++) {
        let block = await web3.eth.getBlock(i);
        
        console.log(`[*] Searching block ${ i }`)
        if (block && block.transactions) {
            for (let txHash of block.transactions) {
                let tx = await web3.eth.getTransaction(txHash)
                if (account === tx.to.toLowerCase()) {
                    console.log(`[+] Transaction found on block ${ lastBlockNumber }`)
                    console.log({ address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() })
                }
            }
        }
    }
}

async function getLatestBlockNumber() {
    let block = await web3.eth.getBlock('latest')
    return block.number;
}