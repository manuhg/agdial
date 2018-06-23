import React, {Component} from 'react';
import { Card, CardImage,CardBody,CardTitle,Row,Col,Container} from 'mdbreact';
import amimg from 'resources/am.jpg';
class Tiles extends Component
{
    render()
    {
        const data=this.props.data;
        // const w=this.props.width;
        // const h=this.props.height;
        // console.log(data,w,h);
        if(typeof(data)!=="object")
            return(<span>Please wait..</span>);
        var cardImgStyle={postion:'relative','width':'101%',paddingTop:'2px'};
        return(
          <Container>
            <Row>
                {Object.entries(data).map((e)=>e[0]).map((d,i)=>
                <Col md="6" key={i}>
                    <a href={'/categories/'+d} style={{textDecoration:'none',color:'black'}}>
                      
                        <Card className="tiles text-left">
                        <CardBody className="elegant-color white-text">
                        <CardTitle className="text-center"><b className="ch">{d}</b></CardTitle>
                        <hr className="hr-light" />

                        <Row>
                        <Col xs="5" sm="5" md="5" > {/*style={{display:'flex',alignItems:'center',justifyContent:'center'}} */}
                        <CardImage style={cardImgStyle} src={amimg} overlay="white-slight" hover waves alt={d}></CardImage></Col>
                        <Col style={{padding:'0px 0px 0px 0px'}} xs="7" sm="7" md="7" >
                            {data[d].map((e,i)=><p key={i}>->&nbsp;{e}</p>)}
                        </Col>
                      </Row>
                        </CardBody>
                        </Card>
                       
                    </a>
                </Col>
                )}
            </Row>
        </Container>
        );
    }
}
export default Tiles;