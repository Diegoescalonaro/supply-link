import React, { Component } from 'react';
/* Import css style */
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import ethereumsvg from '../images/ethereum.svg';
import supply from '../images/supplyproveedor.svg';
/* Util */
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
		this.state = {
			defaultaccount: '0x0',
			contractaddress: '0x0',
			solicitudes: ''
		}
	}

	async componentWillMount() {
		console.log("* * COMPONENT WILL MOUNT ")
		var a = await eth.getDefaultAccount()
		this.setState({
			defaultaccount: await a,
			contractaddress: await eth.address
		})
		this.getAllActiveSolicitudes()
	}

	async componentDidUpdate() {
		console.log(" * * Component Did UPDATE * *")
		eth.getEvent().then(event => {
			this.getAllActiveSolicitudes()
		})
		eth.getMetamaskEvent().then(event => {
			window.location.reload()
		})
	}

	async getSolicitudByID(_id) {
		eth.getSolicitudByID(_id).then(result => {
			this.setState({
				solicitudes: result
			})
		})
	}

	async getAllActiveSolicitudes() {
		eth.getAllActiveSolicitudes().then(result => {
			this.setState({
				solicitudes: result
			})
		})
	}

	async getAllSolicitudesForProvider(_address) {
		eth.getAllSolicitudesForProvider(_address).then(result => {
			this.setState({
				solicitudes: result
			})

		})
	}
	


	render() {
		console.log("* * Component APP Render * *")

		return (
			<div className="App">
				<Header defaultaccount={this.state.defaultaccount} contractaddress={this.state.contractaddress} />

				<header className="App-header">
					<h1 className="tittle">Proveedor </h1>
					<p className="subtittle"> Cubre demandas de clientes</p>
					<hr className="my-2" />
					<img className="image-supply" src={supply} alt="Supply" />

					<div className="div-right">
						<br></br>
						<Button className="button" color="secondary" onClick={e => this.getAllActiveSolicitudes()}> Demandas disponibles</Button>
						<Button className="button" color="secondary" onClick={e => this.getAllSolicitudesForProvider(this.state.defaultaccount)}> Demandas cubiertas </Button>
						<br></br>
						<input className="input" id="input3" ref="search" placeholder="Identificador de solicitud"></input>
						<Button className="button" color="secondary" onClick={e => this.getSolicitudByID(String(this.refs.search.value))}> Ver demanda</Button>

					</div>
				</header>

				<div className="App-body"> <br></br>
					{this.state.solicitudes ?
						<div>
							{
								this.state.solicitudes &&
								<Solicitudes solicitudes={this.state.solicitudes} action="CUBRIR"></Solicitudes>
							}
							< Footer />
						</div>

						: <div>
							<img src={ethereumsvg} className="App-logo" alt="logo" /><h2>Cargando...</h2>
						</div>
					}
				</div>
			</div>
		);
	}
}

export default Proveedor;
