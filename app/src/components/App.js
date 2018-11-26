import React, { Component } from 'react';
import logo from '../logo.svg';
import ethereum from '../ethereum.svg';

import './App.css';

import Web3 from 'web3';
import Web3Provider from 'react-web3-provider';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = { account: '0x0' }
  }
  componentDidMount() {

    if (typeof web3 != 'undefined') {
      this.Web3Provider = Web3.currentProvider
      console.log("Metamask provider")
    } else {
      this.Web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545")
      console.log("Ganache provider")
    }

    this.web3 = new Web3(this.Web3Provider)
    console.log("Default Account:" + this.web3.givenProvider.selectedAddress)
    console.log(this.web3)

    console.log(this.web3.givenProvider.networkVersion)
    var netId = this.web3.givenProvider.networkVersion
    switch (netId) {
      case "1":
        console.log('This is mainnet')
        break
      case "2":
        console.log('This is the deprecated Morden test network.')
        break
      case "3":
        console.log('This is the ropsten test network.')
        break
      case "4":
        console.log('This is the Rinkeby test network.')
        break
      case "42":
        console.log('This is the Kovan test network.')
        break
      default:
        console.log('This is an unknown network.')
    }
  }

  handleClick(e) {
    //e.preventDefault()
    console.log("Hola")
  }


  render() {

  


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
