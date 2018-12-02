import React, { Component } from 'react';
import ethereum from '../utils/ethereum.svg';
import initWeb3 from './web3';

import platformABI from '../ethereum/ABI';

//import * as eth from '../ethereum/ethereumController.js';

import '../css/App.css';

//import Web3 from 'web3';
//import Web3Provider from 'react-web3-provider';

//ROPSTEN SMART CONTRACT: 
//KOVAN SMART CONTRACT: 0xd373d50883532a9e224c0d606c09c8908cb5ec42


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { web3: '', defaultAccount: '0x0', contract: '', smartContractaddress: '0x0' }
  }

  componentWillMount() {
    initWeb3();
  }

  start() {
    var web3 = initWeb3();
    var defaultAccount = web3.currentProvider.selectedAddress;
    this.setState({
      defaultAccount:defaultAccount,
      web3:web3
  })
}

  handleClick(address){
    var trContract = new this.state.web3.eth.Contract(platformABI, address);
    console.log(trContract)

    this.setState({
      contractaddress: address,
      contract: trContract
    })
    
  }


  render() {
    //initWeb3();

    return (
      

      <div className="App">
        <header className="App-header">
          <img src={ethereum} className="App-logo" alt="logo" />
          <p>

            TFG  <code></code>
          </p>
          <button className="aa" onClick={e => this.start()}>Start</button>
          
          <br></br>
          Smart contract Address: <input ref="smartcontractaddress" type="text" ></input>
          <button className="aa" onClick={e => this.handleClick(this.refs.smartcontractaddress.value)}>Smart contract</button>
        </header>

        <div className="App-body">
          <br></br>
          <h1 className="text-white">Welcome to the DAPP!</h1>
          <br></br>      <br></br>

          <h3 className="text-white">Default Account (Metamask): {this.state.defaultAccount}</h3>
          <h3 className="text-white">Smart Contract: {this.state.contractaddress}</h3>

        </div>
      </div>
    );
  }
}

export default App;
