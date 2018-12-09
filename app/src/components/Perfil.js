import React, { Component } from 'react';
import '../styles/App.css';
import * as eth from '../ethereum/ethereumController.js';
import ethereumsvg from '../images/ethereum.svg';
/* React Components */
import Header from './Header';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Solicitudes from './Solicitudes';

/* Config */
import config from '../config';

export default class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultaccount: '',
            contractaddress: '',
            solicitudes: '',
            data: false
        }
    }


    async componentDidMount() {
        this.setState({
            defaultaccount: await eth.getDefaultAccount(),
            contractaddress: eth.address,
        })
        this.getAllMySolicitudes()
    }

    async getAllMySolicitudes() {
        console.log(this.state.defaultaccount)
        eth.getAllSolicitudesByAddress(this.state.defaultaccount).then(result => {
            this.setState({
                solicitudes: result,
                data: false
            })
            console.log(this.state.solicitudes)
        })
    }

    getData() {
        this.setState({
            solicitudes: false,
            data: true
        })
    }

    render() {
        var etherscanaccount = `https://${config.network}.etherscan.io/address/${this.state.defaultaccount}`
        var etherscancontract = `https://${config.network}.etherscan.io/address/${this.state.contractaddress}`
        console.log("* * Component PERFIL Render * *")

        return (
            <div className="App-body">
                <Header></Header>
                <Button className="button" color="secondary" onClick={e => this.getAllMySolicitudes()}> Mostrar mis solicitudes</Button>
                <Button className="button" color="secondary" onClick={e => this.getData()}> Datos </Button>
                {this.state.solicitudes ?
                    <Solicitudes CLASSNAME="button" solicitudes={this.state.solicitudes} action="VALIDAR"></Solicitudes>
                    : <img src={ethereumsvg} className="App-logo" alt="logo" />
                }
                {this.state.data ?
                    <div className="profile-data">
                        <p className="h4" >Default Account (Metamask):	<a href={etherscanaccount}>{this.state.defaultaccount}></a></p>
                        <p className="h4" >Smart Contract: <a href={etherscancontract}>{this.state.contractaddress}</a></p>
                    </div>
                    : <br></br>}
                <br></br><br></br>
                <Link className="link" to="/home">Back to home</Link>
            </div>
        )
    }

}