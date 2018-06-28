import 'resources/App.css';
import React, { Component } from 'react';
import AppBody from 'components/AppBody';
import Business from 'components/Business';
import Listing from 'components/Listing';
import Tiles from 'components/Tiles';
import db from 'utils/db';

const ccname = 'categories'; // categories collection name
const bcname = 'businesses';
const types = {
  tiles: 0,
  listing: 1,
  page: 2,
  0: 'tiles',
  1: 'listing',
  2: 'page',
};
const root = '/';

class App extends Component {
  constructor(props) {
    super(props);
    this.title = 'Home';
    this.state = { changed: false };
    this.dataColl = {};
    this.type = 0; // tiles
    this.fetchCatObj(db);
  }
  setData(index, value) {
    this.dataColl[index] = value;
    this.setState({ changed: !this.state.changed });
    //console.log('sd', index, value);
  }
  memoize(path) {
    if (this.dataColl && this.dataColl[path]) return true; //this.dataColl[path];
    //console.log('memoize');
  }
  fetchCatObj(db) {
    this.fetchDoc(db.collection(ccname).doc(ccname), root, this.setCatObj.bind(this));
  }
  setCatObj(data) {
    //if (data) this.setData(root, data[ccname]);
    //console.log(this.dataColl);
    this.setData(root, data[ccname]);
    this.docAtPath(this.props.location.pathname);
  }

  async fetchDoc(docref, path, cb) {
    if (this.memoize(path)) this.setData('fcIndex3.1415', '0');
    var data = await docref.get();
    if (!data) return;
    var dt = {};
    if (data.exists) /*document*/ dt = data.data();
    else if (!data.empty)
      data.forEach(d => {
        /*querysnapshot*/
        if (d.exists) dt[d.id] = d.data();
      });

    if (cb) cb(dt);
    else this.setData(path, dt);
  }

  valueAtPath(obj, path, isArr) {
    var pa = isArr ? path : path.split('/').filter(Boolean);
    if (!pa.length) return obj;
    return pa.reduce((e, y) => (e && e[y] ? e[y] : null), obj);
  }
  evalPath(path, catObj) {
    //  make '/categories/abc/xyz' => '/abc/xyz'
    var business = null;
    var cpath = path.split('/').filter(Boolean);
    cpath.splice(0, 1);
    var category = this.valueAtPath(catObj, cpath, true);
    if (category) return { cpath, category, business };
    business = cpath.pop();
    category = this.valueAtPath(catObj, cpath, true);
    if (category) return { cpath, category, business };
  }
  urlTargetType(path, pathVals) {
    //what kind of page is the path pointint to
    const catObj = this.dataColl[root];
    if (!catObj) return;
    var type = 0;
    var ep = pathVals;
    if (!ep || !ep.cpath || !ep.category || !ep.business) ep = this.evalPath(path, catObj);
    var { cpath, category, business } = ep;
    cpath = cpath ? cpath[cpath.length - 1] : null;
    if (typeof category === 'object') type += 1;
    if (cpath) {
      if (category.map) type += 1;
      if (business && business.length > 3) type += 1;
    }
    return type - 1;
  }
  docAtPath(path) {
    const catObj = this.dataColl[root];
    if (!catObj) return;
    if (this.memoize(path)) this.setData('fcIndex3.1415', '0');

    var { cpath, category, business } = this.evalPath(path, catObj);
    var type = this.urlTargetType(path, { cpath, category, business });
    cpath = cpath ? cpath[cpath.length - 1] : null;
    switch (type) {
      case types['tiles']:
        this.setData(path, category);
        break;
      case types['listing']:
        this.fetchDoc(db.collection(bcname).where('category', '==', cpath), path);
        break;
      case types['page']:
        this.fetchDoc(
          db
            .collection(bcname)
            .where('name', '==', business)
            .where('category', '==', cpath),
          path
        );
        break;
      default:
        break;
    }
  }

  componentWillUnmount() {
    document.title = 'AgDial';
  }
  // componentDidMount() {
  //   this.fetchDoc(db.collection(ccname).doc(ccname), () =>
  //     this.docAtPath(this.props.location.pathname)
  //   );
  //   console.log('cdm');
  // }
  render() {
    const path = this.props.location.pathname;
    document.title = 'AgDial:' + this.title;
    var cont = <span>{'Loading please wait.'}</span>;
    if (this.dataColl[path]) {
      const data = this.dataColl[path];
      switch (this.urlTargetType(path)) {
        case types['tiles']:
          cont = <Tiles path={path} data={data} />;
          break;
        case types['listing']:
          cont = <Listing path={path} data={data} />;
          break;
        case types['page']:
          cont = <Business path={path} data={data} />;
          break;
        default:
          break;
      }
    }
    return <AppBody active={0}>{cont}</AppBody>;
  }
}

export default App;
