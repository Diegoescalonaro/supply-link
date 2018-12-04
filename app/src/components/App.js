import React, { Component } from 'react';
import ethereumsvg from '../utils/ethereum.svg';
import '../css/App.css';

import initWeb3 from './initWeb3';
import * as eth from '../ethereum/ethereumController.js';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { web3: '', defaultAccount: '0x0', contract: '', contractaddress: '0x0' }
	}

	async componentDidMount() {
		this.setState({
			web3: await eth.web3,
			defaultAccount: await eth.getDefaultAccount(),
			contract: await eth.contract,
			contractaddress: await eth.address
		})
	}

	start() {
		var web3 = initWeb3();
		var defaultAccount = web3.currentProvider.selectedAddress;
		this.setState({
			defaultAccount: defaultAccount,
			web3: web3
		})
	}

	async solicitar(_info) {
		var x = await eth.solicitar(_info)
		console.log(x)
	}

	async getSolicitudByID(_id) {
		var x = await eth.getSolicitudByID(_id)
		console.log(x)
	}

	async getAllSolicitudes() {
		var x = await eth.getAllSolicitudes()
		console.log(x)
	}

	async getAllSolicitudesByAddress(_address) {
		var x = await eth.getAllSolicitudesByAddress(_address)
		console.log(x)
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1>TFG  <code></code></h1>
					<h4 className="text-white">Default Account (Metamask): {this.state.defaultAccount}</h4>
					<h4 className="text-white">Smart Contract: {this.state.contractaddress}</h4>
					<h4 className="text-white"></h4>

					<img src={ethereumsvg} className="App-logo" alt="logo" />

					<button className="aa" onClick={e => this.start()}>Start</button>

					<input className="input" ref="input" type="text" ></input>
				</header>
				
				<div className="App-body">
					<button className="aa" onClick={e => this.solicitar(this.refs.input.value)}> SOLICITAR</button>
					<br></br>
					<button className="aa" onClick={e => this.getSolicitudByID(this.refs.input.value)}> getSolicitudByID</button>
					<br></br>
					<button className="aa" onClick={e => this.getAllSolicitudes()}> getAllSolicitudes</button>
					<br></br>
					<button className="aa" onClick={e => this.getAllSolicitudesByAddress(this.refs.input.value)}> getAllSolicitudesByAddress</button>
					<br></br>
					<h1 className="text-white">Welcome to the DAPP!</h1>
					<br></br>      <br></br>


				</div>
			</div>
		);
	}
}

export default App;
