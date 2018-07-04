import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/tiles.css';

class SubCatTile extends Component {
  render() {
    const { data } = this.props;
    const bw = { wordWrap: 'break-word !important', fontSize: '70%' };
    const hrefbase = '/categories/';
    var cardImgStyle = {
      //maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    };
    if (typeof data !== 'object') return <span>Please wait..</span>;
    //console.log(data);
    const d = data;
    /* <Container fluid>
        <Row style={{ display: 'flex' }}>
          {Object.values(data).map((d, i) => ( */
    return (
      <Col
        style={{ padding: '5px', display: 'flex', flexDirection: 'column' }}
        xs="6"
        sm="4"
        md="3"
      >
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

/* ))} 
        </Row>
      </Container>*/
