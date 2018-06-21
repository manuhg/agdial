import React, {Component} from 'react';
import {Row, Col, Container, Footer} from 'mdbreact';
//import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import brands from '@fortawesome/fontawesome-free-brands';
// import solids from '@fortawesome/fontawesome-free-solid';

class AppFooter extends Component
{
  render()
  {
    // if(!solids||!brands)
    //     console.log("FA icons not found");
     // navbar-fixed-bottom

    var height = Math.max(document.documentElement.clientHeight, window.innerHeight);
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth);
    
    var float=(width>height)?'left':'center';
    return(

      <Footer color="green darken-2"  className="footer"><br/>
                <Container className="text-center">
                    <Row>
                    <Col md="12">
                        <div className="mb-12 flex-center">
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={['fab', 'facebook']} size='2x'/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={['fab', 'youtube']} size='2x'/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon="image" size='2x' /> */}
                            <Row><Col md="12">
                                <span style={{padding:'10px',float:float}}><h5><a href="https://www.youtube.com/user/ShramajeeviAgriFilms">Watch our Videos</a></h5></span>
                                <span style={{padding:'10px',float:float}}><h5><a href="http://shramajeeviimages.com/">Download our Images</a></h5></span>
                                </Col></Row>
                            </div>
                    </Col>
                    </Row>
                </Container>
                
                <div className="text-center">{/*footer-copyright */}
                    <Container fluid>
                       <strong> &copy; {(new Date().getFullYear())} Shramajeevi Agri Films | All Rights Reserved</strong><br/><br/>
                    </Container>
                </div>
            </Footer>
    );
  }
}
export default AppFooter;