import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import amimg from 'resources/am.jpg';

class Tiles extends Component {
  render() {
    const data = this.props.data;
    console.log(data);
    const bw = { wordWrap: 'break-word !important' };
    const hrefbase = '/categories/';
    if (typeof data !== 'object') return <span>Please wait..</span>;
    var cardImgStyle = {
      paddingLeft: '15px',
      maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    };
    return (
      <Container fluid>
        <Row>
          {Object.entries(data)
            .map(e => e[0])
            .map((d, i) => (
              <Col md="6" lg="4" key={i}>
                <a href={hrefbase + d} style={{ textDecoration: 'none', color: 'black' }}>
                  <div style={{ padding: '10px 10px 10px 10px' }} className="container-fluid">
                    <div className="zp row">
                      <div className="zp col-12 mt-3">
                        <div className="zp card tiles">
                          <div style={{ display: 'flex' }} className="zp card-horizontal row">
                            <div style={{ flex: '1' }} className="zp img-square-wrapper col-5">
                              <img style={cardImgStyle} src={amimg} alt={d} />
                            </div>
                            <div style={{ flex: '1' }} className="zp card-body col-7">
                              <h5 className="ch">{d}</h5>
                              <div className="lp cbodytext container text-left">
                                {data[d].map((e, i) => (
                                  <span style={bw} key={i}>
                                    - > &nbsp;
                                    {e.trim()}
                                    <br />
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}
export default Tiles;
/* <Container fluid>
            <Row  style={{display:'flex', width: '100%'}}>
                <Col style={{flex:'1',padding:'1em'}} xs="6" sm="6" md="6">
                <img style={cardImgStyle} src={amimg} alt={d}/>
                <CardImage style={cardImgStyle} src={amimg}
   overlay="white-slight" hover waves alt={d}></CardIm
                </Col>
                <Col style={{flex:'1',padding:'1em'}} xs="6" sm="6" md="6" >
                    <CardBody className="tiles text-left">
                        <CardTitle className="text-center"><b
   className="ch">{d}</b></CardTitle><hr className="hr-dark" />
                            {data[d].map((e,i)=><p key={i}>->&nbsp;{e}</p>)}
                    </CardBody>
                </Col>
            </Row>
        </Container> */
