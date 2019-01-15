import React, { Component } from 'react';
import '../styles/App.css';
import * as eth from '../ethereum/ethereumController.js';
import ethereumsvg from '../images/ethereum.svg';
import supply from '../images/supplycliente.svg';
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
        this.getAllMyActiveSolicitudes()
    }


    async componentDidUpdate() {
        console.log(" * * Component Did UPDATE * *")
        eth.getEvent().then(event => {
            console.log("- - ComponentdidMount EVENTTTTT - - ")
            this.getAllMyActiveSolicitudes()
        })
        eth.getMetamaskEvent().then(event => {
            console.log("- - ComponentdidMount EVENTTTTT - - ")
            window.location.reload()
        })
    }

    async solicitar(_producto, _precio) {
        console.log(eth.web3.utils.toWei(_precio))
        var x = await eth.solicitar(_producto, eth.web3.utils.toWei(_precio))
    }

    async getHistoricForAddress() {
        eth.getHistoricForAddress(this.state.defaultaccount).then(result => {
            console.log(result)
            this.setState({
                solicitudes: result,
                data: false
            })
        })
    }

    async getAllMyActiveSolicitudes() {
        eth.getAllMyActiveSolicitudes(this.state.defaultaccount).then(result => {
            console.log(result)
            this.setState({
                solicitudes: result,
                data: true
            })
        })
    }


    render() {

        console.log("* * Component PERFIL Render * *")
        return (
            <div className="App">
                <Header defaultaccount={this.state.defaultaccount} contractaddress={this.state.contractaddress} />

                <header className="App-header">
                    <h1 className="tittle">Cliente</h1>
                    <p className="subtittle"> Demanda productos a proveedores y valida todo el proceso sobre blockchain.</p>
                    <hr className="my-2" />
                    <img className="image-supply" src={supply} alt="Supply" />
                    <div>
                        <Button className="button" color="secondary" onClick={e => this.getAllMyActiveSolicitudes()}> Solicitudes activas</Button>
                        <Button className="button" color="secondary" onClick={e => this.getHistoricForAddress()}> Historico de solicitudes</Button>
                        <Button className="button" color="secondary" onClick=""> Stock de productos</Button>
                    </div>
                </header>

                <div className="App-body">
                    <div>
                        <br></br>
                        <input className="input" ref="producto" type="text" placeholder="producto a demandar"></input>
                        <input className="input" id="input2" ref="precio" type="number" placeholder="precio ETH"></input>
                        <Button className="button" color="primary" onClick={e => this.solicitar(this.refs.producto.value, this.refs.precio.value)}> SOLICITAR</Button>
                        <br></br>
                    </div>
                    {this.state.data ?
                        this.state.solicitudes ?
                            <div>
                                <Solicitudes className="button" solicitudes={this.state.solicitudes} action="VALIDAR"></Solicitudes>
                                <Footer />
                            </div>
                            : <div>
                                <img src={ethereumsvg} className="App-logo" alt="logo" /><h2>Cargando...</h2>
                            </div>
                        :
                        this.state.solicitudes ?
                            <div>
                                <Solicitudes className="button" solicitudes={this.state.solicitudes} action="VALIDAR"></Solicitudes>
                                <Footer />
                            </div>
                            : <div>
                                <img src={ethereumsvg} className="App-logo" alt="logo" /><h2>Cargando...</h2>
                            </div>
                    }

                </div>
            </div>
        )
    }

}