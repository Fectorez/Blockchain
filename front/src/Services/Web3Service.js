var Web3 = require('web3');
var contract = require('truffle-contract');

export default class Web3Service {
    constructor() {
        var web3;
        const SC, SC_artifacts
    }

    init() {
        if (typeof web3 !== undefined)
            web3 = new Web3(web3.currentProvider)
        else
            web3 = new Web3(new Web3.providers.HttpProvider(''))
    }

    loadSmartContract() {
        SC_artifacts = require('./build/contracts/SC.json')
        SC = contract(SC_artifacts)
        SC.setProvider(web3.currentProvider)
        if(typeof SC.currentProvider.sendAsync !== 'function') {
            SC.currentProvider.sendAsync = function() {
                return SC.currentProvider.send.apply(SC.currentProvider, arguments)
            }
        }
    }
}