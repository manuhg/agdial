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
    const d = data;

    return (
      <div
        style={{ flex: '1 1 auto' }}
        className="col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 card sctiles mr-auto"
      >
        <a href={hrefbase + d.name} className="mzpz">
          <div className="container scdiv mzpz" id={this.props.id}>
            <img alt={d.name} style={cardImgStyle} src={d.image} />
            <h6 className="scchst">{d.name}</h6>
          </div>
        </a>
      </div>
    );
  }
}
export default SubCatTile;
