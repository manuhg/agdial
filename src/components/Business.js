import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/business.css';
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
    console.log('B', data);
    const d = data;

    return (
      <Col style={{ padding: '5px' }} className="col-12">
        <a href={parent + '/' + d.name} style={{ textDecoration: 'none', color: 'black' }}>
          <Container>
            <Row style={{ padding: '5px' }}>
              <Col id={this.props.id} style={{ flex: '1' }} className="card business">
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
