import Footer from 'components/Footer';
import Nav from 'components/Nav';
import { Card, Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';

class AppBody extends Component {
  render() {
    const content = this.props.children;

    return (
      <div>
        <header>
          <Nav active={this.props.active} />
        </header>
        <p>&nbsp;</p>
        <header>
          <Container
            className="text-center"
            style={{ minHeight: '89vh' }}
            fluid
          >
            <Row>
              <Col md="1">{/* <Card style={adStyle}>&nbsp;</Card> */}</Col>
              <Col md="10">
                <Card
                  style={{
                    minHeight: '86vh',
                  }}
                >
                  <Container fluid>
                    {/* <Row><Col>Browse</Col></Row> */}
                    <Row>
                      <Col>{content}</Col>
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
