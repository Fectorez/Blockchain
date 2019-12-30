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

export default class MyPropertiesComponent extends Component {
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
            if (this.isMyProperty(property)) {
                property.id = i
                this.state.properties.push(property)
            }
        }

        this.setState({ nbProperties: nbProperties.toNumber() })
    }

    async getPropertyById(id) {
        deployedContract = await SC.deployed()
        let property = await deployedContract.properties.call(id)
        return makeReadable(property)
    }

    isMyProperty(p) {
        return p.owner.toLowerCase() === web3.eth.accounts.givenProvider.selectedAddress.toLowerCase()
    }

    render() {
        const { nbProperties, properties } = this.state

        return (
            <div className='MyProperties'>
                <h1>Mes propriétés</h1>
                <p>Propriétés : { nbProperties }</p>
                <p>À moi : { properties.length }</p>
                {properties.map((obj, i) => <PropertyCardComponent property={obj} fromCatalog={false} key={i}/>)}
                <div>
                    <a href="/">Catalogue</a>
                    <a href="/post-property">Mettre en vente une propriété</a>
                </div>
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