import React, { Component } from 'react';
import ErrorBoundary from 'utils/ErrorBoundary';
import Footer from 'components/Footer';
import Nav from 'components/Nav';
import bcgImg from 'resources/img/body_bcg.JPEG';
import { rnom } from 'resources/nomenclature';
class AppBody extends Component {
  render() {
    const Content = this.props.children;
    const ep = this.props.ep;
    const catnom = ep && ep.catnom ? ep.catnom : undefined;
    var pwd, Pagination;
    if (catnom) {
      pwd = catnom.split('-').filter(Boolean);
      pwd = pwd.map((e, i, a) => a.slice(0, i).join('-') + (i > 0 ? '-' : '') + e).filter(Boolean);
      pwd = pwd.map(catnom => rnom[catnom]);
      pwd = ['categories', ...pwd];
      if (ep.business) pwd.push(ep.business);
      document.title = 'AgDial : ' + pwd[pwd.length - 1];
      Pagination = () => (
        <nav style={{ borderRadius: '0px' }} aria-label="breadcrumb">
          <ol style={{ borderRadius: '0px', backgroundColor: 'white' }} className="breadcrumb">
            {pwd.map(
              (p, i) =>
                i + 1 === pwd.length ? (
                  <li key={i} className="breadcrumb-item active" aria-current="page">
                    <a href={'/' + pwd.slice(0, i + 1).join('/')}>
                      <font className="pt">{p}</font>
                    </a>
                  </li>
                ) : (
                  <li key={i} style={{ color: 'gray' }} className="breadcrumb-item">
                    <a style={{ color: 'gray' }} href={'/' + pwd.slice(0, i + 1).join('/')}>
                      <font className="pt">{p}</font>
                    </a>
                  </li>
                )
            )}
          </ol>
        </nav>
      );
    }
    const CCard = props => (
      <div
        className="card fp"
        style={{
          minHeight: '86vh',
          // background: 'rgba(255,255,255,0.85)',
        }}
      >
        <div className="container-fluid fc">
          <ErrorBoundary>{Content}</ErrorBoundary>
        </div>
      </div>
    );
    document.body.style.backgroundImage =
      'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url(' + bcgImg + ')';
    return (
      <div style={{ background: 'rgba(255,255,255,0.7)' }}>
        <header id="header">
          <Nav active={this.props.active} />
        </header>
        <span>
          <p>&nbsp;</p>
        </span>
        <header>
          <div className="container-fluid text-center" style={{ minHeight: '89vh' }}>
            {this.props.fullWidth ? (
              <div className="row mzpz">
                <div className="col" />
                <div className="col-md-11 mzpz">
                  {Pagination ? <Pagination /> : ''}
                  <CCard />
                </div>
                <div className="col" />
              </div>
            ) : (
              <div className="row">
                <div className="col" />
                <div className="col-md-10">
                  {Pagination ? <Pagination /> : ''}
                  <CCard />
                </div>
                <div className="col" />
              </div>
            )}

            {/* <div className="row">
              <div className="col">
                <Card style={adStyle}>&nbsp;</Card>
              </div>
              <div className="col" md="10">
                <CCard />
              </div>
              <div className="col">
                <Card style={adStyle}>&nbsp;</Card>
              </div>
            </div> */}

            <div className="row">
              <div className="col">
                <a style={{ textDecoration: 'none', color: 'white' }} href="#header">
                  <div
                    style={{
                      zIndex: '10',
                      position: 'fixed',
                      height: '50px',
                      width: '50px',
                      bottom: '45px',
                      right: '24px',
                      padding: '7px 5px 5px 5px',
                      backgroundColor: '#f44336',
                      borderRadius: '50%',
                      boxShadow: '4px 4px 4px 3px rgba(0, 0, 0, .2)',
                    }}
                  >
                    <i className="fa fa-arrow-up fa-2x rounded-0" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </header>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
export default AppBody;
