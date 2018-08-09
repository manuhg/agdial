import { Col, Container, Row, Button } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/listing.css';

class Listing extends Component {
  render() {
    const { data, parent, width } = this.props;
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
    const ehref = data.type && data.type === 'premium' ? parent + '/' + data.name : undefined;
    return (
      <Col className="zp col-12" style={{ padding: '5px' }}>
        <Container fluid>
          <Row className="zp">
            <Col id={data.id} style={{ flex: '1' }} className="zp">
              <Container fluid>
                <div className="card zp listing">
                  <div className="card-header chl">
                    <strong>{data.name}</strong>
                  </div>
                  <div style={{ width: '100%' }} className="card-body zp">
                    <Container fluid style={{ width: '100%' }}>
                      <Row style={{ display: 'flex' }} className="zp">
                        {width > 767 ? <Col style={imgStyle} /> : <Col />}
                        <Col className="lb" xs="12" sm="12" md="7" lg="8" xl="9">
                          <Container fluid style={{ width: '100%' }} className="zp text-left">
                            <ul className="list-group list-group-flush">
                              {data.content.map((e, j) => (
                                <li className="lp list-group-item" key={j}>
                                  <div style={bw}>{e}&nbsp;</div>
                                </li>
                              ))}
                              {data.Phone || data.Fax ? (
                                <li className="lp list-group-item">
                                  {data.Phone ? (
                                    <span>
                                      <i className="fa fa-phone fa-lg" />&nbsp;{data.Phone[0]}
                                      {','}&nbsp;
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                  {data['customer care'] ? (
                                    <span>
                                      <i className="fa fa-phone fa-lg" />&nbsp;{data['customer care'][0]}
                                      {','}&nbsp;
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                  {data.Fax ? (
                                    <span>
                                      <i className="fa fa-fax fa-lg" />&nbsp;{data.Fax[0]}
                                      {','}&nbsp;
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </li>
                              ) : (
                                ''
                              )}
                              {data.Website || data.Email ? (
                                <li className="lp list-group-item">
                                  {data.Website ? (
                                    <span>
                                      {data.Website.map((e, i) => (
                                        <span key={i}>
                                          {i > 0 ? ', ' : ''}
                                          <a href={'http://' + e} target="_blank" rel="noopener noreferrer">
                                            {e}
                                          </a>
                                          {','}
                                        </span>
                                      ))}
                                    </span>
                                  ) : (
                                    <span />
                                  )}
                                  {data.Email ? (
                                    <span>
                                      <i className="fa fa-envelope fa-lg" />&nbsp;<a href={'mailto:' + data.Email[0]}>
                                        {data.Email[0]}
                                      </a>
                                      {','}
                                    </span>
                                  ) : (
                                    ''
                                  )}
                                </li>
                              ) : (
                                ''
                              )}
                            </ul>
                            {ehref ? (
                              <a style={{ color: 'white' }} href={ehref + '#cont'}>
                                <Button size="sm" color="red">
                                  Go to Page
                                </Button>
                              </a>
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
