import React, { Component } from 'react';
import ErrorBoundary from 'utils/ErrorBoundary';
import Footer from 'components/Footer';
import Nav from 'components/Nav';
import { Card, Col, Container, Row } from 'mdbreact';
import bcgImg from 'resources/img/body_bcg.JPEG';
class AppBody extends Component {
  render() {
    const content = this.props.children;
    document.body.style.backgroundImage =
      'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), url(' + bcgImg + ')';
    return (
      <div>
        <header id="header">
          <Nav active={this.props.active} />
        </header>
        <p>&nbsp;</p>
        <header>
          <Container className="text-center" style={{ minHeight: '89vh' }} fluid>
            <Row>
              <Col md="1">{/* <Card style={adStyle}>&nbsp;</Card> */}</Col>
              <Col md="10">
                <Card
                  className="fp"
                  style={{
                    minHeight: '86vh',
                    background: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <Container className="fc" fluid>
                    {/* <Row><Col>Browse</Col></Row> */}
                    <Row>
                      <Col>
                        <ErrorBoundary>{content}</ErrorBoundary>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </Col>
              <Col md="1">{/* <Card style={adStyle}>&nbsp;</Card> */}</Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{
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
