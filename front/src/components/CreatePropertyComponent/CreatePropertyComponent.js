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
        return (
            <div className='CreateProperty'>
                <h1>Poster une propriété</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Description :
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    </label>
                    <label>
                        Prix (en wei):
                        <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </label>
                    <label>
                        Adresse :
                        <input type="text" name="geoAddress" value={this.state.geoAddress} onChange={this.handleChange} />
                    </label>
                    <label>
                        Surface :
                        <input type="text" name="size" value={this.state.size} onChange={this.handleChange} />
                    </label>
                    <label>
                        Nombre de pièces :
                        <input type="text" name="nbRooms" value={this.state.nbRooms} onChange={this.handleChange} />
                    </label>
                    <label>
                        Documents :
                        <input type="text" name="documents" value={this.state.documents} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
        )
    }
}
