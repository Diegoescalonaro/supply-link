import React, { Component } from 'react';
import logo from '../logo.svg';
import ethereum from '../ethereum.svg';
// import * as eth from '../ethereum/ethereumController.js';

import '../css/App.css';

//import Web3 from 'web3';
//import Web3Provider from 'react-web3-provider';

import web3 from './web3';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { account: '0x0' }
  }
  componentWillMount() {
    

  }

  handleClick(e) {
    //e.preventDefault()
    console.log("Hola")
    console.log()
  }


  render() {

    web3.eth.getAccounts().then(console.log)




    return (
      

      <div className="App">
        <header className="App-header">
          <img src={ethereum} className="App-logo" alt="logo" />
          <p>
             Ethereum Blockchain Platform <code>src/App.js</code> 
          </p>

          <button className="aa" onClick={e => this.handleClick(e)}>Pulsar</button>
        </header>

        <div className="App-body">
          <br></br>
          <h1 className="text-white">Welcome to the DAPP!</h1>
          <br></br>      <br></br>

        </div>
      </div>
    );
  }
}

export default App;
