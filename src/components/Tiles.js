import React, { Component } from 'react';
import 'resources/css/tiles.css';

class Tile extends Component {
  render() {
    const { data } = this.props;
    const bw = { wordWrap: 'break-word !important', fontSize: '70%' };
    const hrefbase = '/categories/';
    var cardImgStyle = {
      maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain',
    };
    if (typeof data !== 'object') return <span>Please wait..</span>;

    return (
      <div className="colmd-6 col-xl-4" style={{ padding: '5px' }}>
        <a href={hrefbase + data.name} style={{ textDecoration: 'none', color: 'black' }}>
          <div className="container">
            <div className="row" style={{ padding: '5px' }}>
              <div id={data.id} style={{ display: 'flex', flexDirection: 'col' }} className="col card tiles">
                <div style={{ display: 'flex' }} className="row zp">
                  <div
                    style={{
                      ...cardImgStyle,
                      background: 'url(' + data.image + ')',
                      backgroundSize: 'cover',
                    }}
                    className="zp img-square-wrapper col-5"
                  />

                  <div style={{ flex: '1' }} className="zp col-7">
                    <font className="ch">{data.name}</font>
                    <div className="container lp text-left">
                      {data.content.map((e, j) => (
                        <span style={bw} key={j}>
                          <i className="fa fa-circle" />&nbsp;{e}
                          <br />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
export default Tile;
