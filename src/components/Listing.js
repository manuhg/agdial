import { Col, Container, Row, Button } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/listing.css';

class Listing extends Component {
  render() {
    const { data, parent } = this.props;
    const bw = {
      wordWrap: 'break-word !important',
      fontSize: '90%',
      textAlign: 'justify',
      textJustify: 'inter-word',
      padding: '0px',
    };
    const imgStyle = {
      background: 'url(' + data.image + ') no-repeat',
      backgroundSize: 'cover',
      paddingTop: '0px',
      borderLeft: '1px solid gray',
    };

    if (typeof data !== 'object') return <span>Please wait..</span>;
    const ehref = data.type_ && data.type_ === 'premium' ? parent + '/' + data.name : undefined;
    // const ehref = parent + '/' + data.name;

    return (
      <Col className="zp col-12" style={{ padding: '5px' }}>
        <Container fluid>
          <Row className="zp">
            <Col id={this.props.id} style={{ flex: '1' }} className="zp">
              <Container>
                <div className="zp card listing">
                  <div className="card-header chl">
                    <strong>{data.name}</strong>
                  </div>
                  <div className="zp card-body">
                    <Container>
                      <Row style={{ display: 'flex' }} className="zp">
                        <Col style={imgStyle} />
                        <Col className="lb" xs="8" lg="10">
                          <main>
                            <Container className="zp text-left">
                              <ul className="list-group list-group-flush">
                                {data.content.map((e, j) => (
                                  <li className="lp list-group-item" key={j}>
                                    <div style={bw}>{e}&nbsp;</div>
                                  </li>
                                ))}
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
                          </main>
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
