import React, { Component } from 'react';
import 'resources/css/business.css';
class Listing extends Component {
  render() {
    const { data } = this.props;
    if (typeof data !== 'object') return <span>Please wait..</span>;
    const d = data;
    var wimg = d.image;
    if (wimg) {
      wimg = wimg.split('.');
      wimg.pop();
      wimg = wimg.join('.');
      wimg += '-w.jpg';
    }
    const w = 90;
    // const imW = { width: w + 'vw' };
    const imW = { width: '100%' };
    // const imH = width > height ? { height: w / 3 + 'vw' } : { height: w / 3 + 'vw' };
    const imH = { height: w / 3 + 'vw' };

    return (
      <div id="cont" className="container-fluid mzpz">
        <div className="row mzpz">
          {/* <div className="col-md-2 zp" /> */}
          <div className="col-12 mzpz">
            <div className="container-fluid mzpz">
              <div className="row mzpz" style={{ ...imW, display: 'flex' }}>
                <div
                  className="bimg col-12 mzpz"
                  // style={{
                  //   flexDirection: 'row',
                  //   display: 'block',
                  //   position: 'absolute',
                  //   top: '0px',
                  //   right: '0px',
                  //   left: '0px',
                  //   width: 100 + 'vw',
                  //   height: 60 + 'vh',
                  //   background: 'url(' + wimg + ') no-repeat',
                  //   backgroundSize: 'cover',
                  // }}
                >
                  <img
                    src={wimg}
                    style={{
                      position: 'relative',
                      ...imW,
                      ...imH,
                    }}
                    alt={d.name}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0px',
                      zIndex: 10,
                      ...imW,
                    }}
                    className="chbd"
                  >
                    <font className="chb">{d.name}</font>
                  </div>

                  <div style={{ borderTop: '5px solid green' }} className="container-fluid">
                    <div className="row mzpz">
                      <div
                        className="col-12 col-sm-12 col-md-3 col-lg-3"
                        style={{ padding: '0px' }}
                      >
                        <div className="card mzpz">
                          <div className="card-header bpch">
                            <font className="display-5">Contact</font>
                          </div>
                          <div style={{ margin: '0px' }} className="card-body">
                            <ul className="list-group list-group-flush">
                              {data.Website ? (
                                <li className="lp list-group-item">
                                  <i className="fa fa-globe fa-lg" />&nbsp;{data.Website
                                    ? data.Website.map((w, k) => (
                                        <span key={k}>
                                          {k > 0 ? ',' : ''}
                                          <a href={'http://' + w} target="_blank" rel="noopener">
                                            {w}
                                          </a>
                                        </span>
                                      ))
                                    : ' '}
                                </li>
                              ) : (
                                ''
                              )}
                              {data.Phone ? (
                                <li className="lp list-group-item">
                                  <i className="fa fa-phone fa-lg" />&nbsp;{data.Phone[0]}&nbsp;
                                </li>
                              ) : (
                                ''
                              )}
                              {data['customer care'] ? (
                                <li className="lp list-group-item">
                                  <i className="fa fa-phone fa-lg" />&nbsp;{
                                    data['customer care'][0]
                                  }&nbsp;
                                </li>
                              ) : (
                                ''
                              )}
                              {data.Fax ? (
                                <li className="lp list-group-item">
                                  <i className="fa fa-fax fa-lg" />&nbsp;{data.Fax[0]}&nbsp;
                                </li>
                              ) : (
                                ''
                              )}
                              {data.Email ? (
                                <li className="lp list-group-item">
                                  <i className="fa fa-envelope fa-lg" />&nbsp;
                                  <a href={'mailto:' + data.Email[0]}>{data.Email[0]}</a>&nbsp;
                                </li>
                              ) : (
                                ''
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ borderLeft: '5px solid green' }}
                        className="col-12 col-sm-12 col-md-9 col-lg-9 lpb text-left"
                      >
                        <div className="card">
                          <div className="card-header text-center bpch">
                            <font className="display-5">Details</font>
                          </div>
                          <div className="card-body">
                            {d.content.map((e, j) => (
                              <div className="card bpc" key={j}>
                                {e}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Listing;
