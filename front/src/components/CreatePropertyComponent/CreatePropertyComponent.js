import React, { Component } from 'react'
import PropertyCardComponent from '../PropertyCardComponent/PropertyCardComponent.js'
import { makeReadable } from '../../utils'

let Web3 = require('web3');
let contract = require('truffle-contract');
let web3, deployedContract;

if(typeof web3 !== 'undefined')
    web3 = new Web3(web3.currentProvider)
else 
    web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/5aef76951e4a4689befb73d13839d113");

let SC_artifacts = require('../../PropertyFactory.json')
let SC = contract(SC_artifacts)
SC.setProvider(web3.currentProvider)

try {
    if (!web3.eth.accounts.givenProvider.selectedAddress) {
        alert('Veuillez vous connecter via MetaMask')
    }
} catch(e) {
    alert('Veuillez vous connecter via MetaMask')
}

export default class CreatePropertyComponent extends Component {
    constructor() {
        super();

        this.state = {
        }
    }

    componentDidMount() {
    }

    async postProperty() {
        deployedContract = await SC.deployed()
        console.log('deployedContract',deployedContract)
        console.log('posting...')
        await deployedContract.post(
          1,
          20,
          Web3.utils.fromAscii("20 rue Montorgueil"),
          Web3.utils.fromAscii("un petit appartement"),
          Web3.utils.fromAscii('Attestation sécurité, ...'),
          2,
          {from:web3.eth.accounts.givenProvider.selectedAddress})
    
        var nb = await deployedContract.getNbProperties()
    
        return nb
    }

    render() {
        const { } = this.state

        return (
            <div className='PropertiesCatalog'>
            </div>
        )
    }
}
