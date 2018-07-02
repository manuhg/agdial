import { Col, Container, Footer, Row, Button } from 'mdbreact';
import React, { Component } from 'react';

class AppFooter extends Component {
  render() {
    const buttons = [
      ['https://www.youtube.com/user/ShramajeeviAgriFilms', 'Watch Agri Videos'],
      ['https://video.shramajeevi.com', 'Buy Agri Videos'],
      ['https://shramajeeviimages.com', 'Download Images'],
      ['https://shramajeewiki.com', 'Read Agri Articles'],
    ];
    return (
      <Footer color="green darken-2" className="footer">
        <br />
        <Container className="text-center">
          <Row>
            <Col md="12">
              <div className="mb-12 flex-center">
                <Container>
                  <Row>
                    {buttons.map((b, i) => (
                      <Col lg="3" key={i}>
                        <a href={b[0]} rel="noopener" target="_blank">
                          <Button color="dark-green">{b[1]}</Button>
                        </a>
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <Col md="12">
                      <hr className="hr-dark" />
                      <h4>
                        <strong>DISCLAIMER</strong>
                      </h4>
                      <div className="text-justify" style={{ fontSize: '.85em' }}>
                        <p>
                          <strong>
                            We compile addresses, business information, product details, price etc.
                            purely on the basis of the details provided by the company or the
                            individual listed on AgDial. We do make sincere efforts to collect
                            truthful and correct information to the best of our knowledge and
                            ability. However, we can’t crosscheck all minor details. So, we suggest
                            the users of this website to take this information just for knowledge
                            and check themselves before entering in to business with any of these
                            firms or individuals. We clarify and declare here that AgDial or
                            Shramajeevi is not responsible directly or indirectly for any loss or
                            difficulties arising out of dealing with any of these listed businesses.
                          </strong>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="text-center">
          {/*footer-copyright */}
          <Container fluid>
            <strong>
              <hr className="hr-dark" />
              &copy; {new Date().getFullYear()} Shramajeevi Agri Films | All Rights Reserved
            </strong>
            <br />
            <br />
          </Container>
        </div>
      </Footer>
    );
  }
}
export default AppFooter;
