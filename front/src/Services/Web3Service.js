var Web3 = require('web3');
var contract = require('truffle-contract');

export default class Web3Service {
    init() {
        if (typeof web3 !== 'undefined')
            web3 = new Web3(web3.currentProvider)
        else
            var web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/5aef76951e4a4689befb73d13839d113");
    }

    loadSmartContract() {
        var SC_artifacts = require('../test/PropertyFactory.json')
        var SC = contract(SC_artifacts)
        SC.setProvider(web3.currentProvider)
        if(typeof SC.currentProvider.sendAsync !== 'function') {
            SC.currentProvider.sendAsync = function() {
                return SC.currentProvider.send.apply(SC.currentProvider, arguments)
            }
        }
        return SC
    }
}