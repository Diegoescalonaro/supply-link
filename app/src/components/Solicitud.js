import React, { Component } from 'react';
import '../styles/App.css';
import web3 from 'web3';

class Solicitud extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log("* * Component SOLICITUD Render * *")
		var item = this.props.item
		var state = "Undefined"
		if (this.props.solicitudes[item].state == 0) state = "Pendiente"
		if (this.props.solicitudes[item].state == 1) state = "Cubierta"
		if (this.props.solicitudes[item].state == 2) state = "Validada"
		
		return (
			<div className="div-solicitud">
				<p className="h4"> · Solicitud {this.props.solicitudes[item].id} </p>
				<hr className="my-2"></hr>
				<p className="lead"> <i className="h4">State:</i> {state} </p>
				<p className="lead"> <i className="h4">Info:</i> {this.props.solicitudes[item].info}</p>
				<p className="lead"> <i className="h4">Price:</i> {web3.utils.fromWei(this.props.solicitudes[item].price)} ETH</p>
				<p className="lead"> <i className="h4">Owner:</i> {this.props.solicitudes[item].owner}</p>
				<p className="lead"> <i className="h4">Provider:</i> {this.props.solicitudes[item].provider}</p>
				<img className="img-state" src={require(`../images/state${this.props.solicitudes[item].state}.png`)}/>
			</div>
		)
	}

}
export default Solicitud
