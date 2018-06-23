import React, {Component} from 'react';
import {Row,Col,Container} from 'mdbreact';// Card, CardImage,CardBody,CardTitle
import amimg from 'resources/am.jpg';
class Tiles extends Component
{
    render()
    {
        const data=this.props.data;
        // const w=this.props.width;
        // const h=this.props.height;
        if(typeof(data)!=="object")
            return(<span>Please wait..</span>);
        var cardImgStyle={paddingLeft:'15px',width:'100%'};
        return(
            
          <Container fluid>
            <Row>
                {Object.entries(data).map((e)=>e[0]).map((d,i)=>
                    <Col md="6" key={i}>
                        {/* <a href={'/categories/'+d} style={{textDecoration:'none',color:'black'}}> */}

                     {/* <Container fluid>
                                <Row  style={{display:'flex', width: '100%'}}>
                                    <Col style={{flex:'1',padding:'1em'}} xs="6" sm="6" md="6">
                                    <img style={cardImgStyle} src={amimg} alt={d}/>
                                    <CardImage style={cardImgStyle} src={amimg} overlay="white-slight" hover waves alt={d}></CardImage>

                                    </Col>
                                    <Col style={{flex:'1',padding:'1em'}} xs="6" sm="6" md="6" >
                                        <CardBody className="tiles text-left">
                                            <CardTitle className="text-center"><b className="ch">{d}</b></CardTitle><hr className="hr-dark" />
                                                {data[d].map((e,i)=><p key={i}>->&nbsp;{e}</p>)}
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Container> */}

<div className="container-fluid">
    <div className="zp row">
        <div className="zp col-12 mt-3">
            <div className="zp card tiles">
                <div className="zp card-horizontal row">
                    <div className="zp img-square-wrapper col-5">
                    <img style={cardImgStyle} src={amimg} alt={d}/>
                    </div>
                    <div className="lp card-body col-7">
                        <h5 className="card-title lp ch">{d}</h5>
                        <div className="lp text-left cbodytext"> {data[d].map((e,i)=><span key={i}>->&nbsp;{e.trim()}<br/></span>)}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
                        {/* </a> */}
                    </Col>
                )}
            </Row>
        </Container>
        );
    }
}
export default Tiles;