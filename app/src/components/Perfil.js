import React, { Component } from 'react';
import '../css/App.css';
//import * as eth from '../ethereum/ethereumController.js';
/* React Components */
import Header from './Header';

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
            </div>
        )
    }

}