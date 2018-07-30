import 'resources/css/business.css';
import React, { Component } from 'react';

class Listing extends Component {
  render() {
    const { data, pr_data } = this.props;

    if (typeof data !== 'object') return <span>Please wait..</span>;
    var wimg = data.image;
    var imgurl_base = 'https://img.agdial.in/images/';

    if (wimg) {
      wimg = wimg.split('.');
      wimg.pop();
      wimg = wimg.join('.');
      wimg += '-w.jpg';
    }
    if (pr_data && pr_data.image) wimg = pr_data.image;
    const w = 90;
    // const imW = { width: w + 'vw' };
    const imW = { width: '100%' };
    // const imH = width > height ? { height: w / 3 + 'vw' } : { height: w / 3 +
    // 'vw' };
    const imH = { height: w / 3 + 'vw' };

    return (
      <div id="cont" className="container-fluid mzpz">
        <div className="row mzpz">
          {/* <div className="col-md-2 zp" /> */}
          <div className="col-12 mzpz">
            <div className="container-fluid mzpz">
              <div
                className="row mzpz"
                style={{
                  ...imW,
                  display: 'flex',
                }}
              >
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
                  <img src={wimg} style={{ position: 'relative', ...imW, ...imH }} alt={data.name} />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0px',
                      zIndex: 10,
                      ...imW,
                    }}
                    className="chbd"
                  >
                    <font className="chb">{data.name}</font>
                  </div>
                  <div style={{ borderTop: '5px solid green' }} className="container-fluid">
                    <div className="row mzpz">
                      <div className="col-12 col-sm-12 col-md-3 col-lg-3" style={{ padding: '0px' }}>
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
                                          <a href={'http://' + w} rel="noopener noreferrer" target="_blank">
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
                                  <i className="fa fa-phone fa-lg" />&nbsp;{data['customer care'][0]}&nbsp;
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
                        style={{
                          borderLeft: '5px solid green',
                        }}
                        className="col-12 col-sm-12 col-md-9 col-lg-9 lpb text-left"
                      >
                        <div className="card">
                          <div className="card-header text-center bpch">
                            <font className="display-5">Profile</font>
                          </div>
                          <div className="card-body">
                            {/* {data.content.map((e, j) => (
                              <div className="card bpc" key={j}>
                                {e}
                              </div>
                            ))} */}
                            {pr_data && pr_data.content
                              ? pr_data.content.map((entry, i) => (
                                  <div className="card bpc" key={i}>
                                    <div className="container mzpz">
                                      {(() => {
                                        if (entry.image) {
                                          return (
                                            <div className="row">
                                              <div className="col-md-4">
                                                <img
                                                  src={imgurl_base + pr_data.prefix + '-' + entry.image + '.jpg'}
                                                  alt={pr_data.prefix + ' ' + entry.image}
                                                  style={{ width: '100%' }}
                                                />
                                              </div>
                                              <div className="col-md-8">{entry.content ? entry.content : ''}</div>
                                            </div>
                                          );
                                        } else if (entry.title && entry.imagelist) {
                                          var imagelist = entry.imagelist.split(',').map(e => e.trim());
                                          var divcn = 'image-list-sm row',
                                            imgcn = 'img-list-img-sm col-6 col-sm-4 col-lg-2';
                                          var captions = entry.captions
                                            ? entry.captions.split(',').map(e => e.trim())
                                            : undefined;
                                          captions =
                                            captions && captions.length === imagelist.length ? captions : undefined;
                                          if (captions) {
                                            return (
                                              <div className="container">
                                                <h2>{entry.title}</h2>
                                                <hr />
                                                <div className={'row'}>
                                                  {imagelist.map((img, k) => (
                                                    <div key={k} className="col-6 col-sm-4 col-lg-3 imgcol text-white">
                                                      <img
                                                        src={imgurl_base + pr_data.prefix + '-' + img + '.jpg'}
                                                        alt={pr_data.prefix + ' ' + (captions ? captions[k] : img)}
                                                        style={{ width: '100%' }}
                                                      />

                                                      <h5
                                                        style={{
                                                          background: 'rgba(0,0,0,1)',
                                                          width: '100%',
                                                        }}
                                                        className="mzpz text-center bw"
                                                      >
                                                        <strong> {captions ? captions[k] : img}</strong>
                                                      </h5>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            );
                                          }

                                          return (
                                            <div className="container">
                                              <h2>{entry.title}</h2>
                                              <hr />
                                              <div className={divcn}>
                                                {imagelist.map((img, k) => (
                                                  <img
                                                    key={k}
                                                    src={imgurl_base + pr_data.prefix + '-' + img + '.jpg'}
                                                    alt={pr_data.prefix + ' ' + (captions ? captions[k] : img)}
                                                    className={imgcn}
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                          );
                                        } else if (entry.content) {
                                          return <p> {entry.content}</p>;
                                        }
                                      })()}
                                    </div>
                                  </div>
                                ))
                              : ''}
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
