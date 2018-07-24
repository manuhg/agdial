import 'resources/css/App.css';
import 'resources/css/loader.css';
import React, { Component } from 'react';
import { Row } from 'mdbreact';
import AppBody from 'components/AppBody';
import Business from 'components/Business';
import Listing from 'components/Listing';
import Tiles from 'components/Tiles';
import SubCatTile from 'components/SubCatTile';
import { db } from 'utils/db';
import { nomenclature, rnom } from 'resources/nomenclature';
const coll_name = 'data'; // categories collection name
const types = {
  list: 0,
  page: 1,
  0: 'list',
  1: 'page',
};
const root = '/';

class App extends Component {
  constructor(props) {
    super(props);
    this.title = 'Home';
    this.state = { changed: false };
    this.ut = {};
    this.dataColl = {};
    this.type = 0; // tiles
    this.docAtPath(this.props.location.pathname);
  }

  setData(index, value, nosS) {
    this.dataColl[index] = value;
    if (!nosS) this.setState({ changed: !this.state.changed });
  }
  memoize(path, obj) {
    obj = obj || this.dataColl;
    if (obj && obj[path]) return true; //this.dataColl[path];
  }

  async fetchDoc(docref, path, cb, noSD) {
    if (this.memoize(path)) return; //this.setData('fcIndex3.1415', '0');
    this.setData(path, 'Fetching..', true);
    var data = await docref.get();
    console.log('Fetching data at ' + path);
    if (!data) return;
    var dt = {};
    if (data.exists) /*document*/ dt = data.data();
    else if (!data.empty)
      data.forEach(d => {
        /*querysnapshot*/
        if (d.exists) dt[d.id] = d.data();
      });

    if (cb) cb(dt);
    if (!noSD) this.setData(path, dt);
  }

  valueAtPath(obj, path, isArr) {
    var pa = isArr ? path : path.split('/').filter(Boolean);
    if (!pa.length) return obj;
    return pa.reduce((e, y) => (e && e[y] ? e[y] : null), obj);
  }

  evalPath(path, nomObj) {
    //  make '/categories/abc/xyz' => '/abc/xyz'
    var business = null;
    var cpath = path.split('/').filter(Boolean);
    cpath.splice(0, 1);

    var catnom = this.valueAtPath(nomObj, cpath, true);
    if (!catnom) {
      business = cpath.pop();
      catnom = this.valueAtPath(nomObj, cpath, true);
    }

    if (catnom) {
      if (catnom === nomObj) return { cpath, catnom: catnom[root], business };
      return { cpath, catnom, business };
    }
  }
  urlTargetType(path, pathVals) {
    //what kind of page is the path pointint to
    //const nomObj = this.dataColl[root];
    if (this.memoize(path, this.ut)) return this.ut[path];
    const nomObj = nomenclature;
    if (!nomObj) return;
    var type = 0;
    var ep = pathVals;
    if (!ep || !ep.cpath || !ep.catnom || !ep.business) ep = this.evalPath(path, nomObj);
    var { cpath, catnom, business } = ep;

    if (catnom) type += 1;
    if (cpath && business && business.length > 3) type += 1;
    this.ut[path] = type - 1;
    return type - 1;
  }
  docAtPath(path) {
    const nomObj = nomenclature;
    if (!nomObj || this.memoize(path)) return;
    //IDs of DOCS as img file names
    var { cpath, catnom, business } = this.evalPath(path, nomObj);
    var type = this.urlTargetType(path, { cpath, catnom, business });
    switch (type) {
      case types['list']:
        this.fetchDoc(db.collection(coll_name).where('path', '==', catnom), path);
        break;
      case types['page']:
        this.fetchDoc(
          db
            .collection(coll_name)
            .where('name', '==', business)
            .where('path', '==', catnom),
          path
        );
        break;
      default:
        this.setData(path, 'Not found!');
        break;
    }
  }

  componentWillUnmount() {
    document.title = 'AgDial';
  }
  previous() {
    this.props.history.go(-1);
  }
  render() {
    document.title = 'AgDial:' + this.title;
    var pathname = this.props.location.pathname;

    var Content = () => (
      <AppBody path={pathname} active={0}>
        <div
          style={{
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          className="text-center"
        >
          <div className="lds-ring" style={{ alignSelf: 'center' }}>
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </AppBody>
    );

    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
    const path = this.props.location.pathname;
    const tType = this.urlTargetType(path);

    if (!this.memoize(path)) this.docAtPath(path);

    if (typeof this.dataColl[path] === 'object') {
      const data = Object.entries(this.dataColl[path]);
      switch (tType) {
        case types['list']:
          try {
            if (data.length > 0)
              Content = () => (
                <AppBody path={pathname} active={0}>
                  <Row
                  // style={{
                  //   display: 'flex',
                  //   justifyContent: 'center',
                  //   flexWrap: 'wrap',
                  // }}
                  >
                    {data.map(
                      (e, i) =>
                        e && e[1].catcode ? (
                          e[1].path !== 'cat' ? (
                            <SubCatTile data={e[1]} key={i} id={e[0]} />
                          ) : (
                            <Tiles data={e[1]} key={i} id={e[0]} />
                          )
                        ) : (
                          <Listing
                            width={width}
                            height={height}
                            search={this.props.location.search}
                            data={e[1]}
                            parent={rnom[e[1].path]}
                            key={i}
                            id={e[0]}
                          />
                        )
                    )}
                  </Row>
                </AppBody>
              );
            else
              Content = () => (
                <AppBody path={pathname} active={0}>
                  <div>
                    <br />
                    <h3>This section is under construction</h3>
                    <br />
                    <h4>We are sorry for the inconveniece</h4>
                  </div>
                </AppBody>
              );
          } catch (err) {
            console.log(err);
            this.previous();
          }
          break;
        case types['page']:
          try {
            const d = data[0][1];
            if (d.type_ && d.type_ === 'premium')
              Content = () => (
                <AppBody path={pathname} fullWidth={true} active={0}>
                  <Row>
                    <Business width={width} height={height} path={path} data={d} id={data[0][0]} />
                  </Row>
                </AppBody>
              );
            else this.previous();
          } catch (err) {
            console.log(err);
            this.previous();
          }
          break;
        default:
          break;
      }
    }
    return <Content />;
  }
}

export default App;
