import { Col, Container, Row, Button } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/listing.css';

class Listing extends Component {
  render() {
    const { data, parent } = this.props;
    const bw = {
      wordWrap: 'break-word !important',
      fontSize: '90%',
      textAlign: 'left',
      textJustify: 'inter-word',
      padding: '0px',
    };
    const imgStyle = {
      background: 'url(' + data.image + ') no-repeat',
      backgroundSize: 'contain',
      paddingTop: '0px',
      borderLeft: '1px solid gray',
    };

    if (typeof data !== 'object') return <span>Please wait..</span>;
    const ehref = data.type_ && data.type_ === 'premium' ? parent + '/' + data.name : undefined;
    // const ehref = parent + '/' + data.name;
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    // height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
    return (
      <Col className="zp col-12" style={{ padding: '5px' }}>
        <Container fluid>
          <Row className="zp">
            <Col id={this.props.id} style={{ flex: '1' }} className="zp">
              <Container fluid>
                <div className="card zp listing">
                  <div className="card-header chl">
                    <strong>{data.name}</strong>
                  </div>
                  <div style={{ width: '100%' }} className="card-body zp">
                    <Container fluid style={{ width: '100%' }}>
                      <Row style={{ display: 'flex' }} className="zp">
                        {width > 767 ? <Col style={imgStyle} /> : <Col />}
                        <Col className="lb" xs="12" sm="12" md="8" lg="10" xl="11">
                          <Container fluid style={{ width: '100%' }} className="zp text-left">
                            <ul className="list-group list-group-flush">
                              {data.content.map((e, j) => (
                                <li className="lp list-group-item" key={j}>
                                  <div style={bw}>{e}&nbsp;</div>
                                </li>
                              ))}

                              {data.Website ? (
                                <li className="lp list-group-item">
                                  {data.Website.map((e, i) => (
                                    <span key={i}>
                                      {i > 0 ? ', ' : ''}
                                      <a href={'http://' + e} target="_blank" rel="noopener">
                                        {e}
                                      </a>
                                    </span>
                                  ))}
                                </li>
                              ) : (
                                <span />
                              )}
                            </ul>
                            {ehref ? (
                              <Button size="sm" color="red">
                                <a style={{ color: 'white' }} href={ehref}>
                                  Go to Page
                                </a>
                              </Button>
                            ) : (
                              <span />
                            )}
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </Col>
    );
  }
}
export default Listing;
