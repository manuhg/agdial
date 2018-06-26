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
    this.mounted = true;
    this.state = { collapse: false, isWideEnough: false };
    this.onClick = this.onClick.bind(this);
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  onClick() {
    if (this.mounted) this.setState({ collapse: !this.state.collapse });
  }

  render() {
    this.mounted = true;
    var actives = [true, false, false, false];
    if (
      typeof this.props.active === 'number' &&
      this.props.active < actives.length
    ) {
      actives[0] = false;
      actives[this.props.active] = true;
    }
    const NLinks = [
      ['/', 'Home'],
      ['/about', 'About Us'],
      ['/pricing', 'Pricing'],
      ['/contact', 'Contact Us'],
    ];
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
            {NLinks.map((e, i) => {
              return actives[i] ? (
                <NavItem active key={i}>
                  <NavLink to={e[0]}>{e[1]}</NavLink>
                </NavItem>
              ) : (
                <NavItem key={i}>
                  <NavLink to={e[0]}>{e[1]}</NavLink>
                </NavItem>
              );
            })}
            {/*<NavItem>
        <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem >
              <NavLink to="/about">About Us</NavLink>
              </NavItem>
              <NavItem >
                    <NavLink to="/pricing">Pricing</NavLink>
                    </NavItem>
                    <NavItem>
                          <NavLink to="/contact">Contact Us</NavLink>
                    </NavItem>*/}
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
