import React, { Component } from 'react'
import PropertyCardComponent from '../PropertyCardComponent/PropertyCardComponent.js'
import NotConnected from '../NotConnected/NotConnected.js'
import { makeReadable } from '../../utils'
import './MyPropertiesComponent.css'

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

export default class MyPropertiesComponent extends Component {
    constructor() {
        super();

        this.state = {
            isConnected: true,
            nbProperties: null,
            properties: []
        }
    }

    componentDidMount() {
        localStorage.setItem('MetaMask', null)
        setTimeout(() => {
            this.checkMetamask()
        }, 100);
        this.getProperties()
    }

    checkMetamask = () => {
        if (web3.eth.accounts.givenProvider.selectedAddress) {
            localStorage.setItem('MetaMask', web3.eth.accounts.givenProvider.selectedAddress)
            this.setState({ isConnected: true })
            return true
        }
        else {
            localStorage.setItem('MetaMask', null)
            this.setState({ isConnected: false })
            return false
        }
    }


    async getProperties() {
        deployedContract = await SC.deployed()
        let nbProperties = await deployedContract.getNbProperties()

        if (localStorage.getItem('MetaMask') != null) {
            for (let i = 0; i < nbProperties; i++) {
                let property = await this.getPropertyById(i)
                if (this.isMyProperty(property)) {
                    property.id = i
                    this.state.properties.push(property)
                }
            }
            this.setState({ nbProperties: nbProperties.toNumber() })
        }
    }

    async getPropertyById(id) {
        deployedContract = await SC.deployed()
        let property = await deployedContract.properties.call(id)
        return makeReadable(property)
    }

    isMyProperty(p) {
        if (this.state.isConnected)
            return p.owner.toLowerCase() === web3.eth.accounts.givenProvider.selectedAddress.toLowerCase()
    }

    render() {
        const { isConnected, nbProperties, properties } = this.state

        return (
            isConnected ?
            <div className='MyProperties'>
                <div className='menu'>
                    <a className="menu-item" href="/">Catalogue des propriétés</a>
                    <a className="menu-item" href="/my-properties">Mes propriétés en vente</a>
                    <a className="menu-item" href="/post-property">Mettre en vente une propriété</a>
                </div>
                <center><h1>Liste de mes propriétés en vente : </h1></center>
                <center><i>Vous avez {properties.length} propriété(s) en vente</i></center>
                {properties.map((obj, i) => <PropertyCardComponent property={obj} fromCatalog={false} key={i}/>)}
            </div> :
            <NotConnected />
        )
    }
}