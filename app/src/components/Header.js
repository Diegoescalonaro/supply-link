import React, { Component } from 'react';
import '../styles/App.css';
import profile from '../images/profile.png';
//import * as eth from '../ethereum/ethereumController.js';
import config from '../config';

import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

export default class Solicitud extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    render() {
        console.log("* * Component HEADER Render * *")
        var etherscanaccount = `https://${config.network}.etherscan.io/address/${this.props.defaultaccount}`
        var etherscancontract = `https://${config.network}.etherscan.io/address/${this.props.contractaddress}`
        var network = `https://www.rinkeby.io/#stats`


        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand className="tittle-header" href="/">&nbsp;One Click Away</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-item-text" href="/proveedor/" id="proveedor-color">Proveedor</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-item-text" href="/cliente/" id="cliente-color">Cliente</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle className="nav-item-text" nav caret>
                            <img src={profile}  alt="profile" />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <NavLink className="nav-item-text" href={etherscanaccount}> Default user account: {this.props.defaultaccount}</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-item-text" href={etherscancontract}> Smart Contract: {this.props.contractaddress}</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className="nav-item-text" href={network}> Ethereum Network: {config.network}</NavLink>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                <NavLink className="nav-item-text" href="/home/"> Exit</NavLink>
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>



                )
            }
        
}