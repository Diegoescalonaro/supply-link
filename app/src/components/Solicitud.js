import React, { Component } from 'react';
import '../styles/App.css';
//import * as eth from '../ethereum/ethereumController.js';

class Solicitud extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log("* * Component SOLICITUD Render * *")
		var item = this.props.item

		return (
			<div className="div-solicitud">
				<p className="h4"> · Solicitud ID: {this.props.solicitudes[item].id} </p>
				<p className="lead"> <i>Info:</i> {this.props.solicitudes[item].info}</p>
				<p className="lead"><i>Owner:</i> {this.props.solicitudes[item].owner}</p>
				<p className="lead"><i>Provider:</i> {this.props.solicitudes[item].provider}</p>
			</div>
		)
	}

}
export default Solicitud
