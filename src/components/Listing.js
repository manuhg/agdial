import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/listing.css';

class Listing extends Component {
  render() {
    const { data, parent } = this.props;
    const bw = { wordWrap: 'break-word !important', fontSize: '70%' };
    //const hrefbase = '/categories/';
    var cardImgStyle = {
      // maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    };
    if (typeof data !== 'object') return <span>Please wait..</span>;
    console.log('L');
    const d = data;
    const ehref = d.class && d.class === 'premium' ? parent + '/' + d.name : '';

    return (
      <Col className="col-12" style={{ padding: '5px' }}>
        <a href={ehref} style={{ textDecoration: 'none', color: 'black' }}>
          <Container>
            <Row style={{ padding: '5px' }}>
              <Col id={this.props.id} style={{ flex: '1' }} className="card listing col-12">
                <Row style={{ display: 'flex' }} className="zp">
                  <Col
                    className="zp img-square-wrapper col-2"
                    style={{
                      ...cardImgStyle,
                      background: 'url(' + d.image + ') no-repeat',
                      backgroundSize: 'contain',
                      paddingTop: '1%',
                    }}
                  />

                  <Col style={{ flex: '1' }} className="lp col-10 text-left">
                    <font className="chl">
                      <strong>{d.name}</strong>
                    </font>
                    <Container className="lp text-left">
                      <ul>
                        {d.content.map((e, j) => (
                          <li>
                            <div style={bw} key={j}>
                              {e}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Container>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </a>
      </Col>
    );
  }
}
export default Listing;
