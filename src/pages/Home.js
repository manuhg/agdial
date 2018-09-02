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
import RestDoc from 'utils/Rest';
const coll_name = 'listings'; // categories collection name
const pr_coll_name = 'premium_data'; // categories collection name
const types = {
  list: 0,
  page: 1,
  0: 'list',
  1: 'page',
};
//const root = '/';

class App extends Component {
  constructor(props) {
    super(props);
    this.title = 'Home';
    this.state = { changed: false };
    this.ut = {};
    this.mounted = false;
    this.dataColl = {};
    this.type = 0; // tiles
    this.docAtPath(this.props.location.pathname);
    var rd = new RestDoc();
    rd.getdoc();
    rd.query();
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

    try {
      this.ep = this.evalPath(this.props.location.pathname, nomenclature);
      var data = await docref.get();
      console.log('Fetching data from ' + path);
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
    } catch (error) {
      console.log(error);
    }
  }

  valueAtPath(obj, path, isArr) {
    var pa = isArr ? path : path.split('/').filter(Boolean);
    if (!pa.length) return obj;
    return pa.reduce((e, y) => (e && e[y] ? e[y] : null), obj);
  }

  evalPath(path, nomObj) {
    var ev_path = path + 'ep';
    if (this.memoize(ev_path)) return this.dataColl[ev_path];
    var business = null;
    var cpath = path.split('/').filter(Boolean);
    //  make '/categories/abc/xyz' => '/abc/xyz'
    cpath.splice(0, 1);
    if (cpath.length === 0) cpath = ['/'];
    //var catnom = this.valueAtPath(nomObj, cpath, true);

    var catnom = nomObj[cpath[cpath.length - 1]];
    if (!catnom) {
      business = cpath.pop();
      catnom = nomObj[cpath[cpath.length - 1]];
    }

    if (catnom) {
      //if (catnom === nomObj) return { cpath, catnom: catnom[root], business };
      var rv = { cpath, catnom, business };
      this.setData(ev_path, rv, true);
      return rv;
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
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    document.title = 'AgDial';
    this.mounted = false;
  }
  previous() {
    //this.props.history.go(-1);
  }
  render() {
    document.title = 'AgDial'; //:' + this.title;

    const path = this.props.location.pathname;
    //console.log(this.dataColl[path]);
    const ep = this.ep;
    var Content = () => (
      <AppBody ep={ep} active={0}>
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
    const tType = this.urlTargetType(path);
    if (!this.memoize(path)) this.docAtPath(path);

    if (typeof this.dataColl[path] === 'object') {
      // const data = Object.entries(this.dataColl[path]);
      const data = Object.values(this.dataColl[path]);
      switch (tType) {
        case types['list']:
          try {
            if (data.length > 0)
              Content = () => (
                <AppBody ep={ep} active={0}>
                  <Row
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      padding: '0px',
                    }}
                  >
                    {data.map(
                      (e, i) =>
                        e && e.catcode ? (
                          e.path !== 'CAT' ? (
                            <SubCatTile data={e} key={i} />
                          ) : (
                            <Tiles data={e} key={i} />
                          )
                        ) : (
                          <Listing
                            width={width}
                            height={height}
                            search={this.props.location.search}
                            data={e}
                            parent={rnom[e.path]}
                            key={i}
                          />
                        )
                    )}
                  </Row>
                </AppBody>
              );
            else
              Content = () => (
                <AppBody ep={ep} active={0}>
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
            const d = data[0];
            const pr_path = path + ' : Premium section';
            if (pr_coll_name && d.id) this.fetchDoc(db.collection(pr_coll_name).doc(d.id), pr_path);
            if (d.type && d.type === 'premium')
              Content = () => (
                <AppBody ep={ep} fullWidth={true} active={0}>
                  <Row>
                    <Business width={width} height={height} data={d} pr_data={this.dataColl[pr_path]} />
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
