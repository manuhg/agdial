import React, {Component} from 'react';
import { Card, Row, Col, Container } from 'mdbreact';

class Tiles extends Component
{
    render()
    {
        const data=this.props.data;
        console.log(data);
        if(typeof(data)!=="object")
            return(<span>Please wait..</span>);
        return(
          <Container>
            <Row>
                {Object.entries(data).map((e)=>e[0]).map((d,i)=>
                <Col md="6" key={i}>
                    <a href={this.props.path+d} style={{textDecoration:'none',color:'black'}}>
                        <Card className="tiles text-left">
                        <div class="text-center"><b class="ch">{d}</b><br/></div>
                        {/* <Container><Row> <Col md="3"><img src="" alt="to be loaded" style={{border:'1px solid black',height:'10vw'}}/></Col>                        <Col> */}
                        <ul>
                            {data[d].map((e,i)=><li key={i}>{e}</li>)}
                        </ul>
                        {/* </Col></Row></Container> */}
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