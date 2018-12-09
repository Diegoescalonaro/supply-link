import React, { Component } from 'react';
import '../styles/App.css';
import * as eth from '../ethereum/ethereumController.js';

import Solicitud from './Solicitud';
import { Button } from 'reactstrap';

class Solicitudes extends Component {

	constructor(props) {
		super(props)
	}

	async cubrir(_id) {
		var x = await eth.cubrir(_id)
		console.log(x)
	}

	async validar(_id) {
		var x = await eth.validar(_id, true)
		console.log(_id)
		alert(x)
	}

	async eliminar(_id) {
		var x = await eth.validar(_id, true)
		console.log(x)
		alert(x)
	}

	render() {
		console.log("* * Component Solicitudes Render * *")
		console.log(this.props.solicitudes)

		return (

			<div key="Solicitudes">
				{Object.keys(this.props.solicitudes).map((item, i) => (
					<div className="div-solicitudes" key={"Solicitud" + item}>
						<Solicitud solicitudes={this.props.solicitudes} item={item}></Solicitud>
						{(this.props.action === "CUBRIR") ? <Button className="button-cubrir" color="primary" onClick={e => this.cubrir(this.props.solicitudes[item].id)}>{this.props.action}</Button>
							: <div>
								<Button color="success" onClick={e => this.validar(this.props.solicitudes[item].id)}>{this.props.action}</Button>
								<Button color="danger" onClick={e => this.eliminar(this.props.solicitudes[item].id)}>ELIMINAR</Button>
							</div>}
					</div>
				))}
			</div>
		)
	}

}
export default Solicitudes


