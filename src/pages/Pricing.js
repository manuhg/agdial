import React, { Component } from 'react';
import AppBody from 'components/AppBody';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText,
} from 'mdbreact';

///rupeee :  &#x20B9;
const pricing = [
  [
    'Basic',
    [
      [
        'Half paragraph of text containing',
        ['Full address', 'Telephone numbers', 'Email address'],
      ],
    ],
    ' Tariff for one year',
    '10,000',
  ],

  [
    'Professional',
    [
      [
        'Full paragraph with',
        [
          'Attractive design',
          'Representative photo',
          'Full address',
          'Telephone numbers',
          'Email address',
          'Video links',
        ],
      ],
    ],
    'Tariff for one year ',
    '25,000',
  ],

  [
    'Premium',
    [
      ['One paragraph space on listing page', []],
      [
        'Dedicated page with',
        [
          'Attractive design',
          'Full address',
          'Telephone numbers',
          'Email address',
          'Website links',
          'Video links',
          'Other additional features',
        ],
      ],
    ],
    'Tariff for one year',
    '50,000',
  ],
];
class Pricing extends Component {
  constructor(props) {
    super(props);
    this.title = 'Pricing';
  }
  render() {
    //style={{color:'black !important'}}
    const cont = (
      <Container>
        <Row>
          <Col md="12">
            <br />
            <h1 className="display-5">
              <strong>Pricing</strong>
            </h1>
            <br />
            <hr className="hr-dark" />
          </Col>
        </Row>
        <Row style={{ display: 'flex' }}>
          {pricing.map((e, i) => {
            return (
              <Col style={{ flex: '1' }} key={i} md="4" className="card">
                <div className="card-header display-4">
                  <h1>{e[0]}</h1>
                </div>
                <div className="card-body">
                  <div className="card-text text-left">
                    <ul>
                      {e[1].map((se, j) => (
                        <li key={j}>
                          <h4>{se[0]}</h4>
                          {se.length ? (
                            <ul>
                              {se[1].map((l, k) => (
                                <li key={k}>
                                  <h5>{l}</h5>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            '&nbsp;'
                          )}{' '}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="card-footer">
                  {e[2]}&nbsp;&#8377;{e[3]}
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
    document.title = 'AgDial:' + this.title;
    return <AppBody active={2}>{cont}</AppBody>;
  }

  /*componentWillUnmount()
    {
        document.title='AgDial';
    }*/
}
export default Pricing;
