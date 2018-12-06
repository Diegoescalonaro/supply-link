import React, { Component } from 'react';
import '../css/App.css';
import * as eth from '../ethereum/ethereumController.js';



class Solicitud extends Component {

	constructor(props) {
		super(props)
		this.state = {solicitudes: 'Default' }

	}

	async componentWillMount(){
		this.setState({
			solicitudes: await eth.getAllSolicitudes(),
	})
	console.log(typeof(solicitudes))
}

	render() {
		console.log("SOLICITUD Component render1: ")

		return (
		
			<div className="text-white">
			Solicitud {1} <br></br>
			ID: {this.state.solicitudes[0].id} <br></br>
			Info: {this.state.solicitudes[0].info}<br></br>
			Owner: {this.state.solicitudes[0].owner}<br></br>
			Provider: {this.state.solicitudes[0].provider}<br></br>
			</div>
		
				
			
		)
	}

}
export default Solicitud


