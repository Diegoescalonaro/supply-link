import React, { Component } from 'react';
import '../styles/App.css';
import * as eth from '../ethereum/ethereumController.js';

import Solicitud from './Solicitud';
import { Button, ButtonGroup } from 'reactstrap';

class Solicitudes extends Component {

	async cubrir(_id) {
		var x = await eth.cubrir(_id)
		console.log(x)
	}

	async validar(_id, _precio) {
		console.log(_precio)
		var x = await eth.validar(_id, _precio)
	}

	async eliminar(_id) {
		var x = await eth.cancelar(_id, true)
		console.log(x)
	}

	async cancelar(_id) {
		var x = await eth.cancelar(_id, false)
		console.log(x)
	}

	render() {
		console.log("* * Component Solicitudes Render * *")
		return (
			<div key="Solicitudes">
				{Object.keys(this.props.solicitudes).map((item, i) => (
					<div className="div-solicitudes" key={"Solicitud" + item}>
						<Solicitud solicitudes={this.props.solicitudes} item={item}></Solicitud>
						<div className="div-solicitudes-buttons">
							{(this.props.action === "CUBRIR") ? <Button className="button-cubrir" color="primary" onClick={e => this.cubrir(this.props.solicitudes[item].id)}>{this.props.action}</Button>
								: <div>
									<Button color="success" className="button2" onClick={e => this.validar(this.props.solicitudes[item].id, this.props.solicitudes[item].precio)}>{this.props.action}</Button>
									<Button color="warning" className="button2" onClick={e => this.cancelar(this.props.solicitudes[item].id)}>CANCELAR</Button>
									<Button color="danger" className="button2" onClick={e => this.eliminar(this.props.solicitudes[item].id)}>ELIMINAR</Button>
								</div>
							}
						</div>
					</div>
				))}
			</div>
		)
	}

}
export default Solicitudes


