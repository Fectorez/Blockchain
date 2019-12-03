import React from 'react';
import './App.css';

function App() {
  var Web3 = require('web3');
  var contract = require('truffle-contract');
  var web3;

  if(typeof web3 !== 'undefined')
    web3 = new Web3(web3.currentProvider)
  else 
    web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/5aef76951e4a4689befb73d13839d113");
  console.log('web3', web3)

  var SC_artifacts = require('./test/PropertyFactory.json')
  var SC = contract(SC_artifacts)
  SC.setProvider(web3.currentProvider)
  if(typeof SC.currentProvider.sendAsync !== 'function') {
      SC.currentProvider.sendAsync = function() {
          return SC.currentProvider.send.apply(SC.currentProvider, arguments)
      }
  }
  console.log('SC', SC)

  async function getActor(actorName) {
    let deployedContract = await SC.deployed()
    let getActor = await deployedContract.getActor.call(actorName)
      return getActor;
    }

  getActor().then((response) => {console.log(response)})

  return (
    <div className="App">
      <header className="App-header">
        <p>TEST</p>
      </header>
    </div>
  );
}

export default App;
