import React, { Component } from 'react';
import { Col, Container, Row } from 'mdbreact';
import AppBody from 'components/AppBody';
class Contact extends Component {
  constructor(props) {
    super(props);
    this.title = 'Contact Us';
  }
  render() {
    document.title = 'AgDial:' + this.title;

    return (
      <AppBody active={3}>
        <Container fluid>
          <Row>
            <Col md="12" style={{ display: 'flex', alignItems: 'center' }} className="text-center">
              <Container fluid style={{ padding: '10px' }} className="text-center">
                <h1 className="display-5">
                  <strong>Contact Us</strong>
                </h1>
                <Row>
                  <Col
                    md="10"
                    style={{ justifySelf: 'center' }}
                    className="text-justify offset-md-1"
                  >
                    <hr className="hr-dark" />
                    <div>
                      <p style={{ width: '100%' }}>
                        Address: Shramajeevi, # 009, Shrinilayam 3, Near Bandematha, Kommaghatta
                        Main Road, Kengeri Satellite Town, Bengaluru 560060. Karnataka.India
                      </p>
                      <p>
                        Mob: +91 9980534320.<br /> Email:&nbsp;
                        <a
                          style={{ textDecoration: 'underline' }}
                          href="mailto:team@shramajeevi.com"
                        >
                          team@shramajeevi.com
                        </a>
                        <br />
                        Website:&nbsp;
                        <a style={{ textDecoration: 'underline' }} href="www.shramajeevi.com">
                          www.shramajeevi.com
                        </a>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
            <hr className="hr-dark" />
          </Row>
        </Container>
      </AppBody>
    );
  }
}
export default Contact;
