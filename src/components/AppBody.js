import React, { Component } from 'react';
import ErrorBoundary from 'utils/ErrorBoundary';
import Footer from 'components/Footer';
import Nav from 'components/Nav';
import { Card, Col, Container, Row } from 'mdbreact';
import bcgImg from 'resources/img/body_bcg.JPEG';
class AppBody extends Component {
  render() {
    const Content = this.props.children;
    const path = this.props.path;
    var pwd, Pagination;
    if (path) {
      pwd = path.split('/').filter(Boolean);
      if (!pwd.length) pwd = ['categories'];
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
      <Card
        className="fp"
        style={{
          minHeight: '86vh',
          // background: 'rgba(255,255,255,0.85)',
        }}
      >
        <Container className="fc" fluid>
          <ErrorBoundary>{Content}</ErrorBoundary>
        </Container>
      </Card>
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
          <Container className="text-center" style={{ minHeight: '89vh' }} fluid>
            {this.props.fullWidth ? (
              <Row className="mzpz">
                <Col />
                <Col className="mzpz" md="11">
                  {Pagination ? <Pagination /> : ''}
                  <CCard />
                </Col>
                <Col />
              </Row>
            ) : (
              <Row>
                <Col />
                <Col md="10">
                  {Pagination ? <Pagination /> : ''}
                  <CCard />
                </Col>
                <Col />
              </Row>
            )}

            {/* <Row>
              <Col>
                <Card style={adStyle}>&nbsp;</Card>
              </Col>
              <Col md="10">
                <CCard />
              </Col>
              <Col>
                <Card style={adStyle}>&nbsp;</Card>
              </Col>
            </Row> */}

            <Row>
              <Col>
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
                  <a style={{ textDecoration: 'none', color: 'white' }} href="#header">
                    <i className="fa fa-arrow-up fa-2x rounded-0" />
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </header>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
export default AppBody;
