import React, {Component} from 'react';
import Nav from 'components/Nav';
import Footer from 'components/Footer';
import {Container,Col,Row,Card} from 'mdbreact';
class AppBody extends Component
{
    render()
    {
        const content = this.props.children ;
        return (
                <div>
                    <header >
                        <Nav/>
                        <Container style={{minHeight:'89vh',position:'relative',top:'3vh'}} className="text-center">
                            <Row>
                                <Col md="1">
                                    <Card>&nbsp;</Card>
                                </Col>
                                <Col md="10">
                                    <Card style={{minHeight:'86vh'}}>{content}</Card>
                                </Col>
                                <Col md="1">
                                    <Card>&nbsp;</Card>
                                </Col>
                            </Row>
                        </Container>
                    </header>
                    <footer>
                        <Footer/>
                    </footer>
                </div>
        );
    }
}
export default AppBody;