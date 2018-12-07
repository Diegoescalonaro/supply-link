import React, { Component } from 'react';
/* Import css style */
import 'bootstrap/dist/css/bootstrap.css';
import '../css/App.css';
import ethereumsvg from '../utils/ethereum.svg';
/* Util */
import initWeb3 from './initWeb3';
import * as eth from '../ethereum/ethereumController.js';
/* React Components */
import { Button } from 'reactstrap';
import Solicitudes from './Solicitudes';
import Header from './Header';


class App extends Component {
	constructor(props) {
		super(props)
		this.state = { web3: '', defaultAccount: '0x0', contract: '', contractaddress: '0x0', solicitudes: '' }
	}

	async componentWillMount() {
		console.log("SOLICITUD componentWillMount 1111111")
		this.setState({
			web3: await eth.web3,
			defaultAccount: await eth.getDefaultAccount(),
			contract: await eth.contract,
			contractaddress: await eth.address,
			solicitudes: await eth.getAllSolicitudes()
		})
		console.log("SOLICITUD componentWillMount 22222222")
		console.log(this.state.solicitudes)
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
		eth.getAllSolicitudes().then(x => {
			this.setState({
				solicitudes: x
			})
		})

		console.log(this.state.solicitudes)

	}

	async getAllSolicitudesByAddress(_address) {
		var x = await eth.getAllSolicitudesByAddress(_address)
		console.log(x)
	}

	render() {
		return (
			<div className="App">

				<Header></Header>

				<header className="App-header">
					<h2>TFG  <code></code></h2>
					<a className="text-white">Default Account (Metamask): {this.state.defaultAccount}</a>
					<a className="text-white">Smart Contract: {this.state.contractaddress}</a>

					<img src={ethereumsvg} className="App-logo" alt="logo" />

					<Button className="aa" color="danger" onClick={e => this.start()}>Start</Button>

					<input className="input" ref="input" type="text" ></input>

					<Button className="aa" color="primary" onClick={e => this.solicitar(this.refs.input.value)}> SOLICITAR</Button>

					<Button className="aa" color="secondary" onClick={e => this.getSolicitudByID(this.refs.input.value)}> getSolicitudByID</Button>

					<Button className="aa" color="secondary" onClick={e => this.getAllSolicitudes()}> getAllSolicitudes</Button>

					<Button className="aa" color="secondary" onClick={e => this.getAllSolicitudesByAddress(this.refs.input.value)}> getAllSolicitudesByAddress</Button>

				</header>

				<div className="App-body">

					<h1 className="text-white">Welcome to the DAPP!</h1>
					<br></br>

					{this.state.solicitudes &&
						<Solicitudes solicitudes={this.state.solicitudes}></Solicitudes>
					}

				</div>
			</div>
		);
	}
}

export default App;
