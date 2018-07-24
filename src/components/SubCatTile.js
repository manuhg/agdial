import React, { Component } from 'react';
import 'resources/css/sctiles.css';

class SubCatTile extends Component {
  render() {
    const { data } = this.props;
    const hrefbase = '/categories/';
    var cardImgStyle = {
      maxWidth: '100%',
      objectFit: 'contain',
      padding: '0%',
      display: 'block',
    };
    if (typeof data !== 'object') return <span>Please wait..</span>;

    return (
      <div
        style={{ flex: '1 1 auto', marginTop: '5px' }}
        className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 card sctiles mr-auto"
      >
        <a href={hrefbase + data.name} className="mzpz">
          <div className="container scdiv mzpz" id={data.id}>
            <img alt={data.name} style={cardImgStyle} src={data.image} />
            <h6 className="scchst">{data.name}</h6>
          </div>
        </a>
      </div>
    );
  }
}
export default SubCatTile;
