import 'resources/css/business.css';
import React, { Component } from 'react';
import { Button } from 'mdbreact';

class Business extends Component {
  constructor() {
    super();
    this.state = { videos: null };
  }
  componentDidMount() {
    const { pr_data } = this.props;

    if (pr_data && pr_data.content)
      pr_data.content.map(entry => {
        if (entry.videolist) {
          var videolist = entry.videolist.split(',').map(e => e.trim());
          if (videolist.length > 1 && this.state.videos !== true) this.setState({ videos: true });
        }
        return 1;
      });
  }
  render() {
    const { data, pr_data } = this.props;
    if (typeof data !== 'object') return <span>Please wait..</span>;
    var wimg = data.image;
    var img_base = 'https://img.agdial.in/images/';

    if (wimg) {
      wimg = wimg.split('.');
      wimg.pop();
      wimg = wimg.join('.');
      wimg += '-w.jpg';
    }
    if (pr_data && pr_data.image) {
      wimg = pr_data.image;
      img_base += pr_data.prefix + '-';
    }
    const w = 90;
    const imW = { width: '100%' };
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
                <div className="bimg col-12 mzpz">
                  <img src={wimg} style={{ position: 'relative', ...imW, ...imH }} alt={data.name} />
                  {!pr_data || !pr_data.image ? (
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
                  ) : (
                    ''
                  )}
                  <div style={{ borderTop: '5px solid green' }} className="container-fluid mzpz">
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
                                <span>
                                  <i className="fa fa-envelope fa-lg" />&nbsp;
                                  {data.Email.map((e, k) => (
                                    <li key={k} className="lp list-group-item">
                                      <a href={'mailto:' + e}>{e}</a>&nbsp;
                                    </li>
                                  ))}
                                </span>
                              ) : (
                                ''
                              )}

                              {data.content.map((e, j) => (
                                <li key={j} className="lp list-group-item text-left">
                                  {e}
                                </li>
                              ))}
                              {this.state.videos ? (
                                <a href="#videos">
                                  <Button color="red">Watch Videos</Button>
                                </a>
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
                            <font className="display-5">Profile</font>
                          </div>
                          <div className="card-body">
                            {pr_data && pr_data.content
                              ? pr_data.content.map((entry, i) => (
                                  <div className="card bpc" key={i}>
                                    <div className="container-fluid mzpz">
                                      {(() => {
                                        if (entry.image && !entry.content) {
                                          return (
                                            <div className="row">
                                              <div className="col-12">
                                                {entry.title ? (
                                                  <div>
                                                    <h2>{entry.title}</h2> <hr />
                                                  </div>
                                                ) : (
                                                  ''
                                                )}
                                                <img
                                                  src={img_base + entry.image + '.jpg'}
                                                  alt={pr_data.prefix + ' ' + entry.image}
                                                  style={{ width: '100%' }}
                                                />
                                              </div>
                                            </div>
                                          );
                                        }
                                        if (entry.image && entry.content) {
                                          return (
                                            <div className="row fp">
                                              <div className="col-12">
                                                {entry.title ? (
                                                  <div>
                                                    <h2>{entry.title}</h2> <hr />
                                                  </div>
                                                ) : (
                                                  ''
                                                )}
                                              </div>
                                              <div className="col-lg-4">
                                                <img
                                                  src={img_base + entry.image + '.jpg'}
                                                  alt={pr_data.prefix + ' ' + entry.image}
                                                  style={{ width: '100%' }}
                                                />
                                              </div>
                                              <div className="col-lg-8">{entry.content}</div>
                                            </div>
                                          );
                                        } else if (entry.imagelist && entry.content) {
                                          var content = entry.content.split('``').filter(Boolean);
                                          var imagelist = entry.imagelist.split(',').map(e => e.trim());
                                          try {
                                            return (
                                              <div className="container">
                                                {entry.title ? (
                                                  <div>
                                                    <h2>{entry.title}</h2> <hr />
                                                  </div>
                                                ) : (
                                                  ''
                                                )}
                                                {imagelist.map((img, k) => (
                                                  <div key={k} className="row">
                                                    <div className="container">
                                                      <div className="row text-justify tiles_tb _5p fp ">
                                                        {/* <div
                                                          className="col-md-4 col-lg-3 col-xl-2 tbi"
                                                          style={{
                                                            background: 'url(' + img_base + img + '.jpg)',
                                                            backgroundSize: 'cover',
                                                          }}
                                                        /> */}
                                                        <div key={k} className="col-sm-5 col-md-4 col-lg-3 imgcol ">
                                                          <img
                                                            src={img_base + img + '.jpg'}
                                                            alt={pr_data.prefix + ' ' + img}
                                                            style={{ width: '100%' }}
                                                          />
                                                        </div>
                                                        <div className="col-sm-7 col-md-8 col-lg-9">
                                                          <div className="container lp_tb text-left">{content[k]}</div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            );
                                          } catch (err) {
                                            console.log(err);
                                          }
                                        } else if (entry.imagelist) {
                                          imagelist = entry.imagelist.split(',').map(e => e.trim());
                                          var divcn = 'row',
                                            imgcn = 'img-list-img-sm col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2';
                                          var captions = entry.captions
                                            ? entry.captions.split(',').map(e => e.trim())
                                            : undefined;
                                          captions =
                                            captions && captions.length === imagelist.length ? captions : undefined;
                                          if (captions) {
                                            return (
                                              <div className="container">
                                                {entry.title ? (
                                                  <div>
                                                    <h2>{entry.title}</h2> <hr />
                                                  </div>
                                                ) : (
                                                  ''
                                                )}

                                                <div className={'row'}>
                                                  {imagelist.map((img, k) => (
                                                    <div key={k} className="col-6 col-sm-4 col-lg-3 imgcol text-white">
                                                      <img
                                                        src={img_base + img + '.jpg'}
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
                                              {entry.title ? (
                                                <div>
                                                  <h2>{entry.title}</h2> <hr />
                                                </div>
                                              ) : (
                                                ''
                                              )}
                                              <div className={divcn}>
                                                {imagelist.map((img, k) => (
                                                  <img
                                                    key={k}
                                                    src={img_base + img + '.jpg'}
                                                    alt={pr_data.prefix + ' ' + (captions ? captions[k] : img)}
                                                    className={imgcn}
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                          );
                                        } else if (entry.content) {
                                          return <p> {entry.content}</p>;
                                        } else if (entry.videolist) {
                                          var videolist = entry.videolist.split(',').map(e => e.trim());

                                          try {
                                            return (
                                              <div id="videos" className="container-fluid mzpz">
                                                {entry.title ? (
                                                  <div className="mzpz">
                                                    <div>
                                                      <h2>{entry.title}</h2> <hr />
                                                    </div>
                                                  </div>
                                                ) : (
                                                  ''
                                                )}
                                                <div
                                                  className=" mzpz"
                                                  style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexWrap: 'wrap',
                                                  }}
                                                >
                                                  {videolist.map((vid, k) => (
                                                    <div
                                                      key={k}
                                                      style={{
                                                        marginBottom: '3px',
                                                        marginRight: '3px',
                                                        padding: '0px',
                                                      }}
                                                    >
                                                      <iframe
                                                        className="vids"
                                                        src={'https://www.youtube.com/embed/' + vid}
                                                        frameBorder="0"
                                                        title="video"
                                                        allow="autoplay; encrypted-media"
                                                        allowFullScreen
                                                      />
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            );
                                          } catch (err) {
                                            console.log(err);
                                          }
                                        }
                                      })()}
                                    </div>
                                  </div>
                                ))
                              : data.content.map((e, j) => (
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
export default Business;
