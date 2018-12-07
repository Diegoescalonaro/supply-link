import React, { Component } from 'react';
import '../css/App.css';
//import * as eth from '../ethereum/ethereumController.js';
/* React Components */
import Header from './Header';
import {Link} from 'react-router-dom';

export default class Solicitud extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        console.log("Perfil render")

        return (
            <div>
                <Header></Header>
                <p>PERFIL</p>
                <Link to="/home">Back to home</Link>
            </div>
        )
    }

}