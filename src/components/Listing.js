import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/listing.css';

class Listing extends Component {
  render() {
    const { data, parent } = this.props;
    const bw = { wordWrap: 'break-word !important', fontSize: '70%' };
    //const hrefbase = '/categories/';
    // var cardImgStyle = {
    //   maxWidth: '100%',
    //   objectFit: 'contain',
    // };
    var w = 6;
    var cardImgStyle = {
      width: w + 'vw',
      height: 2 * w + 'vw',
      // objectFit: 'contain',
    };

    if (typeof data !== 'object') return <span>Please wait..</span>;
    console.log('L');
    const d = data;
    // const ehref = d.class && d.class === 'premium' ? parent + '/' + d.name : '';
    const ehref = parent + '/' + d.name;

    return (
      <Col className="col-12" style={{ padding: '5px' }}>
        <a href={ehref} style={{ textDecoration: 'none', color: 'black' }}>
          <Container>
            <Row>
              <Col id={this.props.id} style={{ flex: '1' }} className="zp card listing">
                <Container>
                  <Row style={{ display: 'flex' }} className="zp">
                    <Col
                      style={{
                        flex: '1',
                        background: 'url(' + d.image + ') no-repeat',
                        backgroundSize: 'contain',
                      }}
                      className="zp col-xs-12 col-sm-12 img-square-wrapper"
                      // style={{
                      //   ...cardImgStyle,
                      //   background: 'url(' + d.image + ') no-repeat',
                      //   backgroundSize: 'contain',
                      //   paddingTop: '1%',
                      //}}
                    />

                    <Col style={{ flex: '1' }} className="zp text-left">
                      <font className="chl">
                        <strong>{d.name}</strong>
                      </font>
                      <Container className="zp text-left">
                        <ul>
                          {d.content.map((e, j) => (
                            <li key={j}>
                              <div style={bw}>{e}</div>
                            </li>
                          ))}
                        </ul>
                      </Container>
                    </Col>
                  </Row>
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
