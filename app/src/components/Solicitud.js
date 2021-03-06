import React, { Component } from 'react';
import '../styles/App.css';
import star from '../images/star.svg';
import web3 from 'web3';

class Solicitud extends Component {
	render() {
		console.log("* * Component SOLICITUD Render * *")
		var item = this.props.item
		var status = "Undefined"
		if (this.props.solicitudes[item].status == 0) status = "Pendiente de cubrir"
		if (this.props.solicitudes[item].status == 1) status = "En proceso de ser cubierta"
		if (this.props.solicitudes[item].status == 2) status = "Validada"
		if (this.props.solicitudes[item].proveedor == "0x0000000000000000000000000000000000000000") this.props.solicitudes[item].proveedor = ""

		return (
			<div className="div-solicitud">

				<p className="h4"> <img src={star} alt="img"/> Solicitud ID: {this.props.solicitudes[item].id} </p>

				<p className="lead"> <i className="h4">Producto/s:</i> {this.props.solicitudes[item].producto}</p>
				<p className="lead"> <i className="h4">Precio:</i> {web3.utils.fromWei(this.props.solicitudes[item].precio)} ETH</p>
				<p className="lead"> <i className="h4">Owner:</i> {this.props.solicitudes[item].owner}</p>
				<p className="lead"> <i className="h4">Proveedor:</i> {this.props.solicitudes[item].proveedor}</p>
				<p className="lead"> <i className="h4">Status:</i> {status} </p>
				<img className="img-state" src={require(`../images/state${this.props.solicitudes[item].status}n.png`)} />
			</div>
		)
	}

}
export default Solicitud
