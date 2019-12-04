import React from 'react';
import './App.css';
const uuid = require('uuid');
function App() {
  var Web3 = require('web3');
  var contract = require('truffle-contract');
  var web3;
  var deployedContract;

  if(typeof web3 !== 'undefined')
    web3 = new Web3(web3.currentProvider)
  else 
    web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/5aef76951e4a4689befb73d13839d113");
  console.log('web3', web3)

  var SC_artifacts = require('./PropertyFactory.json')
  var SC = contract(SC_artifacts)
  SC.setProvider(web3.currentProvider)
  /*if(typeof SC.currentProvider.sendAsync !== 'function') {
      SC.currentProvider.sendAsync = function() {
          return SC.currentProvider.send.apply(SC.currentProvider, arguments)
      }
  }*/
  console.log('SC', SC)
  console.log('account', web3.eth.accounts)

  async function postProperty() {
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
  
    /*async function getPropertyById() {
      console.log('entry')
      let deployedContract = await SC.deployed()
      let p=await deployedContract.properties.call(0)
      console.log('p',p)
        return p
      }*/


      async function getNbProperties() {
        console.log('entry')
        let deployedContract = await SC.deployed()
        let nb=await deployedContract.getNbProperties()
        console.log('nb',nb)
        return nb
      }
      console.log('>>>>momo')

      getNbProperties().then( resp => {
        console.log('nb==',resp.toNumber())
      }, err => {
        console.log('err',err)
      })
      
    postProperty().then( (resp) =>
      console.log('resp=',resp.toNumber()),
    err => 
      console.log('err2',err)
    )

  return (
    <div className="App">
      <header className="App-header">
        <p>TEST</p>
      </header>
    </div>
  );
}

export default App;
