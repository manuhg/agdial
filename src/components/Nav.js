import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import brands from '@fortawesome/fontawesome-free-brands';
import solids from '@fortawesome/fontawesome-free-solid';

class Nav extends Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
          isWideEnough: false
      };
  this.onClick = this.onClick.bind(this);
  if(!solids)
    console.log("FA icons not found");
}

onClick(){
  this.setState({
      collapse: !this.state.collapse,
    });
}

    render() {
        return (
                <Router>
                    <Navbar color="white" light expand="md" scrolling>
                        <NavbarBrand href="/">
                            <strong><font className="green-text"> AgDial</font></strong>
                        </NavbarBrand>
                        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                        <Collapse isOpen={this.state.collapse} navbar>
                            <NavbarNav left>
                                <NavItem active>
                                    <NavLink to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/aboutus">About Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/pricing">Pricing</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/contactus">Contact Us</NavLink>
                                </NavItem>
                            </NavbarNav>
                            <NavbarNav right>
                                <NavItem>
                                    <NavLink to="#"><b>Videos</b></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#"><b>Images</b></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="#"><FontAwesomeIcon icon="share-alt" /></NavLink>
                                </NavItem>
                            </NavbarNav>
                        </Collapse>
                    </Navbar>
                </Router>
        );
    }
}

export default Nav;