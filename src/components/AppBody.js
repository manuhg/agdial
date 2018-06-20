import React, {Component} from 'react';
import Nav from 'components/Nav';
import Footer from 'components/Footer';
import {Container,Col,Row} from 'mdbreact';
class AppBody extends Component
{
    render()
    {
        var height = Math.max(document.documentElement.clientHeight - 200, window.innerHeight - 200, 460);
        const content = this.props.children || <div> &nbsp;</div>;
        return (
            <span>
                <Nav/>
                <Container style={{minHeight: height + 'px'}} className="text-center">
                    {content}
                </Container>
                <Footer/>
            </span>
        );
    }
}
export default AppBody;