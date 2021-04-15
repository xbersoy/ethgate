'use strict'

module.exports = Web3 => {
    const provider = new Web3.providers.HttpProvider(process.env.INFURA_LINK);
    return new Web3(provider)
}