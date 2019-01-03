import React, { Component } from 'react';
import '../styles/App.css';
import * as eth from '../ethereum/ethereumController.js';
import ethereumsvg from '../images/ethereum.svg';
import supply from '../images/supply.svg';
/* React Components */
import Solicitudes from './Solicitudes';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';


/* Config */
import config from '../config';

export default class Proveedor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultaccount: '',
            contractaddress: '',
            solicitudes: '',
            data: false
        }
    }

    async componentWillMount() {
        this.setState({
            defaultaccount: await eth.getDefaultAccount(),
            contractaddress: eth.address,
        })
        this.getAllMySolicitudes()
    }


    async componentDidUpdate() {
        console.log(" * * Component Did UPDATE * *")
        eth.getEvent().then(event => {
            console.log("- - ComponentdidMount EVENTTTTT - - ")
            this.getAllMySolicitudes()
        })
        eth.getMetamaskEvent().then(event => {
            console.log("- - ComponentdidMount EVENTTTTT - - ")
            window.location.reload()
        })
    }

    async solicitar(_producto, _precio) {
        console.log(eth.web3.utils.toWei(_precio))
        var x = await eth.solicitar(_producto, eth.web3.utils.toWei(_precio))
        console.log(x)
    }

    async getAllMySolicitudes() {
        eth.getAllSolicitudesByAddress(this.state.defaultaccount).then(result => {
            this.setState({
                solicitudes: result,
                data: false
            })
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
            <div className="App">
                <Header defaultaccount={this.state.defaultaccount} contractaddress={this.state.contractaddress} />

                <header className="App-header">
                    <h1 className="tittle">Cliente</h1>
                    <p className="subtittle"> Demanda productos a proveedores y valida todo el proceso sobre blockchain.</p>
                    <hr className="my-2" />
                    <img className="image-supply" src={supply} alt="Supply" />
                    <hr className="my-2" />

                    <div>
                        <input className="input" ref="producto" type="text" placeholder="producto a demandar"></input>
                        <input className="input" id="input2" ref="precio" type="number" placeholder="precio ETH"></input>
                        <Button className="button" color="primary" onClick={e => this.solicitar(this.refs.producto.value, this.refs.precio.value)}> SOLICITAR</Button>
                    </div>
                </header>

                <div className="App-body">
                    <Button className="button" color="secondary" onClick={e => this.getAllMySolicitudes()}> Mostrar mis solicitudes</Button>
                    <Button className="button" color="secondary" onClick={e => this.getData()}> Datos </Button>

                    {this.state.solicitudes ?
                        <div>
                            <Solicitudes className="button" solicitudes={this.state.solicitudes} action="VALIDAR"></Solicitudes>
                            <Footer />
                        </div>
                        : <img src={ethereumsvg} className="App-logo" alt="logo" />
                    }
                    {this.state.data ?
                        <div>
                            <div className="profile-data">
                                <p className="h4" >Ethereum network: <a href={"https://kovan.etherscan.io/"}>  {config.network}</a></p>
                                <p className="h4" >Default Account (Metamask):	<a href={etherscanaccount}>{this.state.defaultaccount}></a></p>
                                <p className="h4" >Smart Contract: <a href={etherscancontract}>{this.state.contractaddress}</a></p>
                            </div>
                            <Footer />
                        </div>
                        : <br></br>}

                </div>
            </div>
        )
    }

}