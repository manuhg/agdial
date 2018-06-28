import React, { Component } from 'react';
import ErrorBoundary from 'utils/ErrorBoundary';
import Footer from 'components/Footer';
import Nav from 'components/Nav';
import { Card, Col, Container, Row } from 'mdbreact';
import bcgImg from 'resources/img/Mango-Soyabean-1.jpg';
class AppBody extends Component {
  render() {
    const content = this.props.children;
    document.body.style.backgroundImage =
      'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url(' + bcgImg + ')';
    return (
      <div>
        <header>
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
                    background: 'rgba(255,255,255,0.9)',
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
