import React, { Component } from 'react'

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

export default class PropertiesCatalogComponent extends Component {
    constructor() {
        super();

        this.state = {
            nbProperties: null,
        }
    }

    componentDidMount() {
        this.getNbProperties()
    }

    async getNbProperties() {
        deployedContract = await SC.deployed()
        let nbProperties = await deployedContract.getNbProperties()

        for (let i = 0; i < nbProperties; i++) {
            let property = await this.getPropertyById(i)
            console.log('Property n° ' + i + ' : ', property)
        }

        this.setState({ nbProperties: nbProperties.toNumber() })
    }

    async getPropertyById(id) {
        deployedContract = await SC.deployed()
        let property = await deployedContract.properties.call(id)
        return property
    }

    render() {
        const { nbProperties } = this.state
        return (
            <div>
                <p>Nombre de propriétés : { nbProperties }</p>
            </div>
        )
    }
}