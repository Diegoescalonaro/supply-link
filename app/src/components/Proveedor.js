import React, { Component } from 'react';
/* Import css style */
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import ethereumsvg from '../images/ethereum.svg';
import supply from '../images/supply.svg';
/* Util */
import initWeb3 from '../utils/initWeb3';
import * as eth from '../ethereum/ethereumController.js';
import config from '../config';
/* React Components */
import { Button } from 'reactstrap';
import Solicitudes from './Solicitudes';
import Header from './Header';
import Footer from './Footer';

class Proveedor extends Component {
	constructor(props) {
		super(props)
		this.state = { web3: '', defaultaccount: '0x0', contract: '', contractaddress: '0x0', solicitudes: '' }
	}

	async componentWillMount() {
		console.log("* * COMPONENT WILL MOUNT ")
		this.setState({
			web3: await eth.web3,
			defaultaccount: await eth.getDefaultAccount(),
			contract: await eth.contract,
			contractaddress: await eth.address,
			solicitudes: await eth.getAllSolicitudes()
		})
	}

	async componentDidUpdate() {
		console.log(" * * Component Did UPDATE * *")
		eth.getEvent().then(event => {
			console.log("- - ComponentdidMount EVENTTTTT - - ")
			this.getAllSolicitudes()
		})
		eth.getMetamaskEvent().then(event => {
			console.log("- - ComponentdidMount EVENTTTTT - - ")
			window.location.reload()
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

	async solicitar(_producto, _precio) {
		console.log(this.state.web3.utils.toWei(_precio))
		var x = await eth.solicitar(_producto, this.state.web3.utils.toWei(_precio))
		console.log(x)
	}

	async getSolicitudByID(_id) {
		eth.getSolicitudByID(2).then(x => {
			this.setState({
				solicitudes: x
			})
			console.log(x)
		})
	}

	async getAllSolicitudes() {
		eth.getAllSolicitudes().then(x => {
			this.setState({
				solicitudes: x
			})
		})

	}

	async getAllSolicitudesByAddress(_address) {
		eth.getAllSolicitudesByAddress(_address).then(x => {
			this.setState({
				solicitudes: x
			})
		})
	}

	async getAllSolicitudesForProvider(_address){
		eth.getAllSolicitudesForProvider(_address).then(x=>{
			this.setState({
				solicitudes:x
			})

		})
	}

	render() {
		console.log("* * Component APP Render * *")

		//TODO: ERROR Please pass numbers as strings or BigNumber objects to avoid precision errors.

		return (
			<div className="App">
				<Header defaultaccount={this.state.defaultaccount} contractaddress={this.state.contractaddress} />

				<header className="App-header">
					<h1 className="tittle">Supply-Link</h1>
					<p className="subtittle"> Plataforma que conecta cliente con proveedor, a traves de la automaticación de las necesidades del cliente.</p>
					<hr className="my-2" />
					<img className="image-supply" src={supply} alt="Supply" />
					<hr className="my-2" />
					<p className="subtittle"> Demanda productos a proveedores</p>
					<p className="subtittle"> Cubre demandas de clientes</p>
					<p className="subtittle"> Valida el proceso</p>
					<hr className="my-2" />
					<br></br>

					<Button className="button" color="danger" onClick={e => this.start()}>Restart</Button>
				</header>
				{this.state.solicitudes ?
					<div className="App-body">
						<div>
							<input className="input" ref="producto" type="text"></input>
							<input className="input" id="input2" ref="precio" type="number"></input>
							<Button className="button" color="primary" onClick={e => this.solicitar(this.refs.producto.value, this.refs.precio.value)}> SOLICITAR</Button>
						</div>
						<div>
							<br></br>
							<input className="input" id="input3" ref="search"></input>

							<Button className="button" color="secondary" onClick={e => this.getSolicitudByID()}> Ver demanda</Button>
							<Button className="button" color="secondary" onClick={e => this.getAllSolicitudes()}> Ver todas</Button>
							<Button className="button" color="secondary" onClick={e => this.getAllSolicitudesForProvider(this.state.defaultaccount)}> Mostrar mi histórico </Button>
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

export default Proveedor;
