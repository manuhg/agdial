import React, { Component } from 'react';
import { Col, Container, Row } from 'mdbreact';
import VSH from 'resources/img/Profile/VSH.png';
import SGubbi from 'resources/img/Profile/SGubbi.png';
import Prashant from 'resources/img/Profile/Prashant.png';
import Suresh from 'resources/img/Profile/Suresh.png';
import Manu from 'resources/img/Profile/Manu.png';
import { Fa } from 'mdbreact';

class ImageCircle extends Component {
  render() {
    const { src, alt, colour1, colour2, units, bSize, ImgBcg } = this.props;
    return (
      <img
        src={src}
        alt={'Pic: ' + alt}
        style={{
          height: units,
          width: units,
          borderRadius: '50%',
          backgroundColor: ImgBcg ? colour1 : colour2,
          padding: '0px',
          border: bSize + ' solid ' + colour2,
          boxShadow: '0 0 0 ' + bSize + ' ' + colour1,
        }}
      />
    );
  }
}

const AboutData = {
  title: 'Team AgDial',
  team: [
    [
      '#26b133',
      VSH,
      'DR. Venkatramana Hegde',
      'CMD',
      'https://www.linkedin.com/in/vshegde/',
      'Graduated from University of Agricultural Sciences, Dharwad in 1992. He was a practical farmer on his own farm, agricultural journalist, social worker till 2001. Then ETV-Annadata reporter till 2005, Producer of Annadata at RFC, Hyderabad till 2007, Nonfiction Producer at Kasturi TV Bengaluru till 2009. Right now, DR. Hegde is the Producer and Director of Shramajeevi Agri Films and CMD of Shramajeevi Television Pvt. Ltd. Bengaluru.',
    ],
    [
      '#fd8469',
      SGubbi,
      'Dr. Sheshagiri Gubbi',
      'Director (Content)',
      'https://www.linkedin.com/in',
      'Dr. Sheshagiri Gubbi, Ph. D (Plant Genetics) and Post-Doctoral Fellow (Plant Biotechnology) has varied experience in agricultural R&D in Agricultural Universities, ICAR, CSIR and Corporate laboratories. His interests in Minimising and Systematic reduction of Agrochemicals has lead him to specialise in alternative microbial technologies for Soil health, Plant nutrition and Stress management which he has optimised in Rice, Vegetables, Sugarcane and Grapes. He works closely with farmers from sharing know-how, Supply of quality inputs, Production of pesticides free crops and establishing the Market linkages.',
    ],
    [
      '#8432ff',
      Prashant,
      'Mr. Prashant Hegde',
      'Director (Sales)',
      'https://www.linkedin.com/in',
      'Prashant is an agriculture graduate with post-graduation in management. He brings in 20 years of experience in agri input sales and financial services industry. He has vast experience in agricultural investment and project management. Earlier he worked for HDFC Bank, RBL Bank, Janalakshmi Small Finance Bank.',
    ],
    [
      '#5dddd3',
      Suresh,
      'Mr. Suresh Bhat',
      'Director (Marketing)',
      'https://www.linkedin.com/in/suresh-bhat-62547129/',
      'Suresh has 23 years of Agriculture and Food industry experiences in executive and management roles with Cargill, Monsanto, and Avesta Good Earth Foods. Suresh has his Masters in Agriculture from University of Agriculture Sciences Dharwad and Executive Management Programme from Indian Institute of Management (IIM) Bangalore. Suresh is a recipient of University Gold Medal from UAS Dharwad at postgraduate studies.',
    ],
    [
      '#6765ff',
      Manu,
      'Mr. Manu Hegde',
      'Director (Technical) ',
      'https://www.linkedin.com/in/manu-hegde/',
      'Pursuing Bachelor of Engineering (Computer Science) 7th semester at Dr. AIT, Bengaluru. He is the main driving force of technical team of Shramajeevi. All websites and internet activities of Shramajeevi are built and managed under his directions. ',
    ],
  ],
  about: (
    <span>
      <p>
        Shramajeevi Agri Films was established in 2004 as an exclusive visual
        media production house for agriculture. It had produced number of
        agricultural documentary films in Kannada, English and Hindi. These were
        sold in the form of DVDs in India, Sri Lanka and Bangladesh. Shramajeevi
        produced number of AVs for government departments, research
        organisations and corporate companies. Now Shramajeevi documentaries are
        available for watching on its YouTube channels.
      </p>{' '}
      <p>
        Shramajeevi launched many websites for different issues related to
        farming. Shramajeevi is becoming 24x7 satellite TV channel in Kannada
        exclusive for agriculture very soon, under the banner of Shramajeevi
        Television Pvt. Ltd. Bengaluru.
      </p>{' '}
      <p>
        {' '}
        Farmers from across the country and globe keep calling Shramajeevi for
        various contacts of innovative farmers, institutes etc. So,{' '}
        <a href="https://shramajeevicontacts.com">shramajeevicontacts.com</a>, a
        service website with good number of contacts was launched in the year
        2015. The feedback was very good and it helped thousands of farmers.
        Then it was decided to bring out the business version of the same now as{' '}
        <a href="https://agdial.in">agdial.in</a> in more systematic and
        extensive way. Call and SMS facility and many more features will be
        added at later stage.
      </p>{' '}
      <p>
        {' '}
        We know it is a huge, extensive and expensive task as the sector is
        highly unorganised and scattered domain. We will exercise our sincere
        efforts in the days to come to bring all stakeholders of farming on this
        website. We plan to get in to E commerce exclusive for agriculture in
        the brand name AgTrade <a href="https://agtrade.in">agtrade.in</a> in
        2nd phase.
      </p>{' '}
      <p>
        {' '}
        To begin with AgDial is focussing on Karnataka state and it will cover
        the whole country in later stage. AgDial will be absolutely free for
        users. We hope this communication platform will enhance connectivity
        between various stakeholders of farming bringing a positive change in
        the farming sector of India.
      </p>
    </span>
  ),
};

class About extends Component {
  render() {
    const p = { padding: '10px' };
    return (
      <Container fluid>
        <Row>
          <Col
            md="12"
            style={{ display: 'flex', alignItems: 'center' }}
            className="text-center"
          >
            <Container fluid style={p} className="text-center">
              <h1 className="display-5">
                <strong>About Us</strong>{' '}
              </h1>
              <Row>
                <Col
                  md="10"
                  style={{ justifySelf: 'center' }}
                  className="text-justify offset-md-1"
                >
                  <hr className="hr-dark" />
                  {AboutData.about}
                </Col>
              </Row>
            </Container>
          </Col>
          <hr className="hr-dark" />
        </Row>
        <Row>
          {' '}
          <Col md="12">&nbsp;</Col>
        </Row>
        <Row>
          <Col md="12">
            <Container fluid style={p} className="text-center">
              <Row style={p}>
                <Col
                  md="10"
                  style={{ justifySelf: 'center' }}
                  className="offset-md-1"
                >
                  <h1 className="display-5">
                    <strong>{AboutData.title}</strong>
                  </h1>
                  <hr className="hr-dark" />
                </Col>
                {AboutData.team.map((p, i) => {
                  return (
                    <Container
                      fluid
                      key={i}
                      md="10"
                      style={{ justifySelf: 'center' }}
                      className="text-justify offset-md-1"
                    >
                      <Row
                        style={{ display: 'flex', alignItems: 'center' }}
                        className="card-horizontal row"
                      >
                        <Col style={{ padding: '20px' }} md="3">
                          <ImageCircle
                            colour1={p[0]}
                            src={p[1]}
                            alt={p[2]}
                            colour2="white"
                            units="150px"
                            bSize="6px"
                            ImgBcg={false}
                          />
                        </Col>
                        <Col
                          className="text-left"
                          style={{ padding: '20px' }}
                          md="8"
                        >
                          <h4 style={{ color: p[0] }}>
                            <strong>{p[2]}</strong>
                          </h4>
                          <div>
                            <h6 style={{ color: 'gray', display: 'inline' }}>
                              <strong>{p[3]}</strong>
                            </h6>
                            <h5 style={{ display: 'inline' }}>
                              <a href={p[4]}>
                                &nbsp;<Fa icon="linkedin-square" />
                              </a>
                            </h5>
                          </div>
                          <div className="text-justify">{p[5]}</div>
                        </Col>
                      </Row>
                    </Container>
                  );
                })}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default About;
