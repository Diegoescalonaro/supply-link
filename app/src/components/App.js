import React, { Component } from 'react';
/* Import css style */
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import ethereumsvg from '../images/ethereum.svg';
/* Util */
import initWeb3 from '../utils/initWeb3';
import * as eth from '../ethereum/ethereumController.js';
import config from '../config';
/* React Components */
import { Button } from 'reactstrap';
import Solicitudes from './Solicitudes';
import Header from './Header';
import Footer from './Footer';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = { web3: '', defaultaccount: '0x0', contract: '', contractaddress: '0x0', solicitudes: '' }
	}

	async componentWillMount() {
		this.setState({
			web3: await eth.web3,
			defaultaccount: await eth.getDefaultAccount(),
			contract: await eth.contract,
			contractaddress: await eth.address,
			solicitudes: await eth.getAllSolicitudes()
		})
	}

	start() {
		var web3 = initWeb3();
		var defaultaccount = web3.currentProvider.selectedAddress;
		this.setState({
			defaultaccount: defaultaccount,
			web3: web3
		})
	}

	async solicitar(_info, _price) {
		console.log(this.state.web3.utils.toWei(_price))
		var x = await eth.solicitar(_info, this.state.web3.utils.toWei(_price))
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
			console.log(x)
		})

	}

	async getAllSolicitudesByAddress(_address) {
		var x = await eth.getAllSolicitudesByAddress(_address)
		console.log(x)
	}

	// watchEvents(){
	// 	// TODO: trigger
	// 	this.state.contract.events.NuevaSolicitud({}, function (error, event) {
	// 		console.log("EVENTO-----------")
	// 		if (event !== undefined && event.event === "NuevaSolicitud") {
	// 			console.log(event.returnValues)
	// 		}
	// 	})
	// }

	async componentDidMount() {
		if (this.state.contract.events !== undefined) {
			this.watchEvents()
		}
	}

	render() {
		console.log("* * Component APP Render * *")
		// console.log(this.web3)
		var etherscanaccount = `https://${config.network}.etherscan.io/address/${this.state.defaultaccount}`
		var etherscancontract = `https://${config.network}.etherscan.io/address/${this.state.contractaddress}`


		return (
			<div className="App">
				<Header />

				<header className="App-header">
					<h1 className="text-white">Welcome to the DAPP!</h1>
					<hr className="my-2" />
					<div>
						<p className="text-white" >Default Account (Metamask):	<a href={etherscanaccount}>{this.state.defaultaccount}></a></p>
						<p className="text-white" >Smart Contract: <a href={etherscancontract}>{this.state.contractaddress}</a></p>
					</div>
					<Button className="button" color="danger" onClick={e => this.start()}>Restart</Button>
				</header>
				{this.state.solicitudes ?
					<div className="App-body">
						<input className="input" ref="product" type="text" ></input>
						<input className="input" ref="price" type="number" ></input>
						<div>
							<Button className="button" color="primary" onClick={e => this.solicitar(this.refs.product.value, this.refs.price.value)}> SOLICITAR</Button>
							<Button className="button" color="secondary" onClick={e => this.getSolicitudByID(this.refs.input.value)}> getSolicitudByID</Button>
							<Button className="button" color="secondary" onClick={e => this.getAllSolicitudes()}> getAllSolicitudes</Button>
							<Button className="button" color="secondary" onClick={e => this.getAllSolicitudesByAddress(this.refs.input.value)}> getAllSolicitudesByAddress</Button>
						</div>

						{this.state.solicitudes &&
							<Solicitudes solicitudes={this.state.solicitudes} action="CUBRIR"></Solicitudes>
						}
						<Footer />
					</div>

					: <div>
						<img src={ethereumsvg} className="App-logo" alt="logo" /><h2>Cargando...</h2>
					</div>
				}

			</div>
		);
	}
}

export default App;
