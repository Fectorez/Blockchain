import React, { Component } from 'react'
import NotConnected from '../NotConnected/NotConnected.js'
import './CreatePropertyComponent.css'

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

export default class CreatePropertyComponent extends Component {
    constructor() {
        super();

        this.state = {
            isConnected: true,
            description: '',
            price: '',
            geoAddress: '',
            size: '',
            nbRooms: '',
            documents: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        localStorage.setItem('MetaMask', null)
        setTimeout(() => {
            this.checkMetamask()
        }, 100);
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

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        deployedContract = await SC.deployed()
        await deployedContract.post(
            this.state.price,
            this.state.size,
            Web3.utils.fromAscii(this.state.geoAddress),
            Web3.utils.fromAscii(this.state.description),
            Web3.utils.fromAscii(this.state.documents),
            this.state.nbRooms,
            {from:web3.eth.accounts.givenProvider.selectedAddress}
        )
        window.location.href = '/my-properties'
    }

    render() {
        const { isConnected } = this.state
        return (
            isConnected ? 
            <div className='CreateProperty'>
                <div className='menu'>
                    <a className="menu-item" href="/">Catalogue des propriétés</a>
                    <a className="menu-item" href="/my-properties">Mes propriétés</a>
                    <a className="menu-item" href="/post-property">Mettre en vente une propriété</a>
                </div>
                <center><h1>Mise en vente d'une propriété</h1></center>
                <center><i>Veuillez remplir le formulaire suivant</i></center>
                <center><div className='form-post'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-item'>
                            <input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} required/>
                        </div>
                        <div className='form-item'>
                            <input type="number" placeholder="Prix (en WEI)" step="0.1" name="price" value={this.state.price} onChange={this.handleChange} required/>
                        </div>
                        <div className='form-item'>
                            <input type="text" placeholder="Adresse" name="geoAddress" value={this.state.geoAddress} onChange={this.handleChange} required/>
                        </div>
                        <div className='form-item'>
                            <input type="number" placeholder="Surface (en m²)" step="0.5" name="size" value={this.state.size} onChange={this.handleChange} required/>
                        </div>
                        <div className='form-item'>
                            <input type="number" placeholder="Nombre de pièces" step="1" name="nbRooms" value={this.state.nbRooms} onChange={this.handleChange} required/>
                        </div>
                        <div className='form-item'>
                            <input type="text" placeholder="Documents à fournir" name="documents" value={this.state.documents} onChange={this.handleChange} required/>
                        </div>
                        <input className='form-validation' type="submit" value="Valider la mise en vente du bien" />
                    </form>
                </div></center>
            </div> :
            <NotConnected />
        )
    }
}
