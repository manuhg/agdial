import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/tiles.css';

class SubCatTile extends Component {
  render() {
    const { data } = this.props;
    const hrefbase = '/categories/';
    var cardImgStyle = {
      //maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    };
    if (typeof data !== 'object') return <span>Please wait..</span>;
    const d = data;

    return (
      <Col style={{ padding: '2px', flex: '1' }} xs="6" sm="6" md="6" lg="3">
        <a href={hrefbase + d.name} style={{ textDecoration: 'none', color: 'black' }}>
          <Container>
            <Row>
              <Col id={this.props.id} className="card tiles">
                <Container>
                  <Row style={{ display: 'flex' }} className="zp">
                    <Col className="zp img-square-wrapper col-12">
                      <img
                        alt={d.name}
                        style={{
                          ...cardImgStyle,
                          padding: '1%',
                        }}
                        src={d.image}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="zp col-12 text-center">
                      <h6 className="chst">{d.name}</h6>
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
export default SubCatTile;
