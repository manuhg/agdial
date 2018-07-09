import { Col, Container, Row, Card } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/business.css';
class Listing extends Component {
  render() {
    const { data, parent } = this.props;
    // const bw = { wordWrap: 'break-word !important', fontSize: '70%' };
    //const hrefbase = '/categories/';
    var w = 81;
    var cardImgStyle = {
      width: w + 'vw',
      height: w / 3 + 'vw',
      objectFit: 'contain',
    };
    if (typeof data !== 'object') return <span>Please wait..</span>;
    console.log('B', data);
    const d = data;
    var wimg = d.image;
    if (wimg) {
      wimg = wimg.split('.');
      wimg.pop();
      wimg = wimg.join('.');
      wimg += '-w.jpg';
    }

    return (
      <Col style={{ padding: '5px' }} className="col-12">
        <a href={parent + '/' + d.name} style={{ textDecoration: 'none', color: 'black' }}>
          <Container>
            <Row style={{ padding: '5px' }}>
              <Col id={this.props.id} style={{ flex: '1' }} className="card business">
                <Container>
                  <Row style={{ display: 'flex' }} className="zp">
                    <Col
                      className="zp img-square-wrapper col-12"
                      style={{
                        ...cardImgStyle,
                        background: 'url(' + wimg + ') no-repeat',
                        backgroundSize: 'cover',
                      }}
                    >
                      <div className="chbd">
                        <font className="chb">{d.name}</font>
                      </div>
                    </Col>
                    <Col style={{ flex: '1' }} className="zp col-12">
                      <Container className="lpb text-left">
                        {d.content.map((e, j) => (
                          <Card className="bpc" key={j}>
                            {e}
                          </Card>
                        ))}
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
