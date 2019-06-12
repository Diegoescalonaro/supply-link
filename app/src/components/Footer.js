import React, { Component } from 'react';
import '../styles/App.css';

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("* * Component HEADER Render * *")

        return (
            <div className="footer">
                <br></br>
                <h3 className="head"></h3>
                <p className="lead">Trabajo Fin De Grado - One Click Away</p>
                <br></br>
            </div>

        )
    }

}