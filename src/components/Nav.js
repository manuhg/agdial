import { Collapse, Navbar, NavbarBrand, NavbarNav, NavbarToggler, NavItem, NavLink } from 'mdbreact';
import React, { Component } from 'react';
import logo from 'resources/img/agdial.png';
import { nav_routes } from 'components/Routes';
//import Search from 'components/Search';
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
    var actives = Array(nav_routes.length);
    if (typeof this.props.active === 'number' && this.props.active < actives.length) actives[this.props.active] = true;
    else actives[0] = true;

    // const externalLinks = [
    //   ['https://shramajeewiki.com', 'Articles'],
    //   ['https://shramajeeviimages.com', 'Images'],
    //   ['https://www.youtube.com/user/ShramajeeviAgriFilms', 'Videos'],
    // ];

    return (
      <Navbar color="white" light expand="md">
        {/*scrolling*/}
        <NavbarBrand href="/">
          <img src={logo} alt="Agdial Logo" height="80" />
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left>
            {nav_routes.map((e, i) => {
              return actives[i] ? (
                <NavItem active key={i}>
                  <NavLink to={e[0]}>
                    <strong>{e[1]}</strong>
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem key={i}>
                  <NavLink to={e[0]}>
                    <strong>{e[1]}</strong>
                  </NavLink>
                </NavItem>
              );
            })}
          </NavbarNav>
          {/* <Search /> */}
          {/* <NavbarNav right>
            {externalLinks.map((l, i) => (
              <NavItem key={i}>
                <NavLink to={l[0]} target="_blank" rel="noopener">
                  <strong>{l[1]}</strong>
                </NavLink>
              </NavItem>
            ))}
          </NavbarNav> */}
        </Collapse>
      </Navbar>
    );
  }
}

export default Nav;
