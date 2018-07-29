import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/tiles.css';

class Tile extends Component {
  render() {
    const { data } = this.props;
    const bw = { wordWrap: 'break-word !important', fontSize: '70%' };
    const hrefbase = '/categories/';
    var cardImgStyle = {
      maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    };
    if (typeof data !== 'object') return <span>Please wait..</span>;

    return (
      <Col style={{ padding: '5px' }} md="6" lg="6" xl="4">
        <a href={hrefbase + data.name} style={{ textDecoration: 'none', color: 'black' }}>
          <Container>
            <Row style={{ padding: '5px' }}>
              <Col
                id={data.id}
                style={{ display: 'flex', flexDirection: 'col' }}
                className="card tiles"
              >
                <Row style={{ display: 'flex' }} className="zp">
                  <Col
                    style={{
                      ...cardImgStyle,
                      background: 'url(' + data.image + ')',
                      backgroundSize: 'cover',
                    }}
                    className="zp img-square-wrapper col-5"
                  />

                  <Col style={{ flex: '1' }} className="zp col-7">
                    <font className="ch">{data.name}</font>
                    <Container className="lp text-left">
                      {data.content.map((e, j) => (
                        <span style={bw} key={j}>
                          <i className="fa fa-circle" />&nbsp;{e}
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
export default Tile;
