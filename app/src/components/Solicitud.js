import React, { Component } from 'react';
import '../css/App.css';
import * as eth from '../ethereum/ethereumController.js';

class Solicitud extends Component {
	constructor(props) {
		super(props)
		this.state = { solicitudes: this.props.solicitudes }
	}

	render() {
		console.log("SOLICITUD Component render")
		var item = this.props.item

		return (
			<div className="text-white">
				Solicitud {item} <br></br>
				ID: {this.state.solicitudes[item].id} <br></br>
				Info: {this.state.solicitudes[item].info}<br></br>
				Owner: {this.state.solicitudes[item].owner}<br></br>
				Provider: {this.state.solicitudes[item].provider}<br></br>

			</div>
		)
	}

}
export default Solicitud
