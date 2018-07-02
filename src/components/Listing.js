import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';

class Listing extends Component {
  render() {
    const { data, parent } = this.props;
    const bw = { wordWrap: 'break-word !important', fontSize: '70%' };
    //const hrefbase = '/categories/';
    var cardImgStyle = {
      maxHeight: '100%',
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
                    style={{
                      ...cardImgStyle,
                      background: 'url(' + d.image + ')',
                      backgroundSize: 'cover',
                    }}
                    className="zp img-square-wrapper col-5"
                  />

                  <Col style={{ flex: '1' }} className="zp col-7">
                    <h5 className="ch">
                      <strong>{d.name}</strong>
                    </h5>
                    <Container className="lp text-left">
                      {d.content.map((e, j) => (
                        <span style={bw} key={j}>
                          {e}
                          <br />
                        </span>
                      ))}
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
