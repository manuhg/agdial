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
import logo from 'resources/img/agdial.png';
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
    if (typeof this.props.active === 'number' && this.props.active < actives.length) {
      actives[0] = false;
      actives[this.props.active] = true;
    }
    const externalLinks = [
      ['https://shramajeewiki.com', 'Articles'],
      ['https://shramajeeviimages.com', 'Images'],
      ['https://www.youtube.com/user/ShramajeeviAgriFilms', 'Videos'],
    ];
    const NLinks = [
      ['/', 'Home'],
      ['/about', 'About Us'],
      ['/pricing', 'Pricing'],
      ['/contact', 'Contact Us'],
    ];
    return (
      <Navbar color="white" light expand="md" scrolling>
        <NavbarBrand href="/">
          <img src={logo} alt="Agdial Logo" height="80" />
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
          </NavbarNav>
          <NavbarNav right>
            {externalLinks.map((l, i) => (
              <NavItem key={i}>
                <NavLink to={l[0]} target="_blank" rel="noopener">
                  <strong>{l[1]}</strong>
                </NavLink>
              </NavItem>
            ))}
            {/* <NavItem>
              <NavLink to="http://twitter.com/share?text=Agdial - Agriculture Contacts Directory&url=http://agdial.in/&hashtags=agriculture,farming,directory">
                <i className="fa fa-share-alt fa-lg  fa-2x" />
              </NavLink>
            </NavItem> */}
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Nav;
