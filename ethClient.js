'use strict'

module.exports = Web3 => {
    const provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/0fab95b914f345fe859ae8b8a9a25375');
    return new Web3(provider)
}