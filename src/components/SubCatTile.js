// import { Col, Container, Row } from 'mdbreact';
import React, { Component } from 'react';
import 'resources/css/tiles.css';

class SubCatTile extends Component {
  render() {
    const { data } = this.props;
    const hrefbase = '/categories/';
    var cardImgStyle = {
      //maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    };
    if (typeof data !== 'object') return <span>Please wait..</span>;
    const d = data;

    return (
      <div
        style={{ padding: '2px', flex: '1 1 auto' }}
        className="card tiles col-6 col-sm-4 col-md-3"
      >
        <a href={hrefbase + d.name} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="container" id={this.props.id}>
            <div className="row zp" style={{ display: 'flex' }}>
              <div className="zp img-square-wrapper">
                <img
                  alt={d.name}
                  style={{
                    ...cardImgStyle,
                    padding: '1%',
                  }}
                  src={d.image}
                />
              </div>
            </div>
            <div className="row zp">
              <div className="zp text-center">
                <h6 className="chst">{d.name}</h6>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
export default SubCatTile;
