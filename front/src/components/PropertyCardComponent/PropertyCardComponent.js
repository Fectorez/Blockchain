import React, { Component } from 'react'
import logoToSell from '../../images/toSell.png'
import './PropertyCardComponent.css'

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

export default class PropertyCardComponent extends Component {
    constructor(props) {
        super();

        this.state = {
            property: props.property,
            fromCatalog: props.fromCatalog,
        }
    }

    buyProperty = async () => {
        deployedContract = await SC.deployed()
        const id = this.state.property.id
        const from = web3.eth.accounts.givenProvider.selectedAddress
        const value = web3.utils.toWei(this.state.property.price.toString(), "ether")
        await deployedContract.buy(id, {from: from, value: 3}) // MARCHE PAS
        window.location.href = '/my-properties'
    }

    render () {
        const obj = this.state.property
        const fromCatalog = this.state.fromCatalog

        return (
            <div className='PropertyCardComponent'>
                <h1>{obj.description}</h1>
                <center><img className='logoToSell' src={ logoToSell } alt="Maison à vendre" /></center>
                    <p><span className='fas fa-map-marker-alt' />  {obj.geoAddress}</p>
                    <p><span className='fas fa-home' />  {obj.size}m² - {obj.nbRooms} pièce(s)</p>
                    <p><span className='fas fa-dollar-sign' />  {obj.price} ETH</p>
                    <p><span className='fas fa-file' />  {obj.documents}</p>
                {fromCatalog ? <button className="buyProperty" type="button" onClick={this.buyProperty}>Acheter la propriété</button> : null}
            </div>
        )
    }
}