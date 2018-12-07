import React, { Component } from 'react';
import '../css/App.css';
import * as eth from '../ethereum/ethereumController.js';

import Solicitud from './Solicitud';
import { Button } from 'reactstrap';

class Solicitudes extends Component {

	constructor(props) {
		super(props)
		this.state = { solicitudes: this.props.solicitudes }

	}

	// async componentWillMount(){
	// 	this.setState({
	// 		solicitudes: await eth.getAllSolicitudes(),
	// })
	// }

	render() {
		console.log("SOLICITUDES Component render1: ")
		return (

			<div className="text-white" key="Solicitudes">
				{Object.keys(this.state.solicitudes).map((item, i) => (
					<div className="div-solicitudes" key={"Solicitud" + item}>
						<Solicitud  solicitudes={this.state.solicitudes} item={item}></Solicitud>
						<Button color="danger">Cubrir</Button>
					</div>
				))}
			</div>
		)
	}

}
export default Solicitudes


