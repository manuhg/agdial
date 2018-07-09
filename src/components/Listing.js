import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/listing.css';

class Listing extends Component {
  render() {
    const { data, parent } = this.props;
    const bw = {
      wordWrap: 'break-word !important',
      fontSize: '90%',
      textAlign: 'justify',
      textJustify: 'inter-word',
      padding: '0px',
    };
    //const hrefbase = '/categories/';
    // var cardImgStyle = {
    //   maxWidth: '100%',
    //   maxWidth: '150px',
    //   objectFit: 'contain',
    // };

    if (typeof data !== 'object') return <span>Please wait..</span>;
    const d = data;
    const ehref = d.class && d.class === 'premium' ? parent + '/' + d.name : '';
    // const ehref = parent + '/' + d.name;

    return (
      <Col className="col-12" style={{ padding: '5px' }}>
        <a href={ehref} style={{ textDecoration: 'none', color: 'black' }}>
          <Container>
            <Row>
              <Col id={this.props.id} style={{ flex: '1' }} className="zp">
                <Container>
                  <div className="zp card listing">
                    <div className="card-header chl">
                      <strong>{d.name}</strong>
                    </div>
                    <div className="zp card-body">
                      <Container>
                        <Row style={{ display: 'flex' }} className="zp">
                          <Col xs="8" lg="10">
                            <main>
                              <Container className="zp text-left">
                                <ul className="list-group list-group-flush">
                                  {d.content.map((e, j) => (
                                    <li className="list-group-item" key={j}>
                                      <div style={bw}>{e}</div>
                                    </li>
                                  ))}
                                </ul>
                              </Container>
                            </main>
                          </Col>
                          <Col
                            style={{
                              background: 'url(' + d.image + ') no-repeat',
                              backgroundSize: '100% 100%',
                              padding: '0px',
                              borderLeft: '1px solid gray',
                            }}
                          >
                            {/* <img src={d.image} alt={d.name} style={cardImgStyle} /> */}
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
                </Container>
              </Col>
            </Row>
          </Container>
        </a>
      </Col>
    );
  }
}
export default Listing;
