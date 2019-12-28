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

export default class PropertiesCatalogComponent extends Component {
    constructor() {
        super();

        this.state = {
            nbProperties: null,
            properties: []
        }
    }

    componentDidMount() {
        this.getProperties()
    }

    async getProperties() {
        deployedContract = await SC.deployed()
        let nbProperties = await deployedContract.getNbProperties()

        for (let i = 0; i < nbProperties; i++) {
            let property = await this.getPropertyById(i)
            console.log('Property n° ' + i + ' : ', property)
            if (property.selling && !this.isMyProperty(property)) {
                this.state.properties.push(property)
            }
        }

        this.setState({ nbProperties: nbProperties.toNumber() })
    }

    isMyProperty(p) {
        return p.owner.toLowerCase() === web3.eth.accounts.givenProvider.selectedAddress.toLowerCase()
    }

    async getPropertyById(id) {
        deployedContract = await SC.deployed()
        let property = await deployedContract.properties.call(id)
        return makeReadable(property)
    }

    render() {
        const { nbProperties, properties } = this.state

        return (
            <div className='PropertiesCatalog'>
                <p>Nombre de propriétés : { nbProperties }</p>
                {properties.map((obj, i) => <PropertyCardComponent property={obj} fromCatalog={true} key={i}/>)
                }
            </div>
        )
    }
}


//   async function postProperty() {
//     deployedContract = await SC.deployed()
//     console.log('deployedContract',deployedContract)
//     console.log('posting...')
//     await deployedContract.post(
//       1,
//       20,
//       Web3.utils.fromAscii("20 rue Montorgueil"),
//       Web3.utils.fromAscii("un petit appartement"),
//       Web3.utils.fromAscii('Attestation sécurité, ...'),
//       2,
//       {from:web3.eth.accounts.givenProvider.selectedAddress})

//     var nb = await deployedContract.getNbProperties()

//     return nb
//   }