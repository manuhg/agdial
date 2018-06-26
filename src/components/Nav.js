import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'mdbreact';
import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false, isWideEnough: false };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <Navbar color="white" light expand="md" scrolling>
        <NavbarBrand href="/">
          <strong>
            <font className="green-text">AgDial</font>
          </strong>
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
            <NavItem active>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/pricing">Pricing</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact">Contact Us</NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              <NavLink to="#">
                <b>Videos</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#">
                <b>Images</b>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="#">
                <i className="fa fa-share-alt fa-lg  fa-2x" />
              </NavLink>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Nav;
