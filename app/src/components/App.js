import React, { Component } from 'react';
import ethereum from '../utils/ethereum.svg';
import initWeb3 from './web3';

import * as eth from '../ethereum/ethereumController.js';

import '../css/App.css';

//import Web3 from 'web3';
//import Web3Provider from 'react-web3-provider';



class App extends Component {

  constructor(props) {
    super(props)
    this.state = { account: '0x0' }
  }

  componentWillMount() {
    initWeb3();
  }

  start() {
    initWeb3();
  }

  handleClick(){
    
  }


  render() {
    initWeb3();

    //web3.eth.getAccounts().then(console.log)

    return (
      

      <div className="App">
        <header className="App-header">
          <img src={ethereum} className="App-logo" alt="logo" />
          <p>

            TFG  <code></code>
          </p>

          <button className="aa" onClick={e => this.start()}>Start</button>
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
