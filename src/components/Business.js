import { Card, Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';

class Business extends Component {
  render() {
    const data = this.props.data;
    console.log(this.props);
    if (typeof data !== 'object') return <span>Please wait..</span>;
    return (
      <Container className="fc">
        <Row className="fc">
          {Object.entries(data)
            .map(e => e[0])
            .map((d, i) => (
              <Col md="12" className="fc" key={i}>
                <Card className="fc tiles text-left">
                  <div className="text-center">
                    <b className="ch">{d}</b>
                    <br />
                  </div>
                  <ul>
                    {Object.entries(data[d]).map((v, i) => <li key={i}> {v[0] + ':' + v[1]} </li>)}
                  </ul>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}
export default Business;
