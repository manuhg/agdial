import 'resources/App.css';
import React, { Component } from 'react';
import AppBody from 'components/AppBody';
import Business from 'components/Business';
import Listing from 'components/Listing';
import Tiles from 'components/Tiles';
import { db, storage } from 'utils/db';
import nomenclature from 'resources/nomenclature';
const cname = 'data'; // categories collection name
const coll_nom = 'nomenclature';
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
    this.getHomeImageUrls(db, storage);
  }

  setData(index, value, nosS) {
    this.dataColl[index] = value;
    if (!nosS) this.setState({ changed: !this.state.changed });
    //console.log('sd', index, value);
  }
  memoize(path) {
    if (this.dataColl && this.dataColl[path]) return true; //this.dataColl[path];
    //console.log('memoize');
  }

  async fetchDoc(docref, path, cb, noSD) {
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
    var category = this.valueAtPath(nomObj, cpath, true);
    if (!category) {
      business = cpath.pop();
      category = this.valueAtPath(nomObj, cpath, true);
    }
    if (category) {
      if (category === nomObj) return { cpath, category: category[root], business };
      return { cpath, category, business };
    }
  }
  urlTargetType(path, pathVals) {
    //what kind of page is the path pointint to
    //const nomObj = this.dataColl[root];
    const nomObj = nomenclature;
    if (!nomObj) return;
    var type = 0;
    var ep = pathVals;
    if (!ep || !ep.cpath || !ep.category || !ep.business) ep = this.evalPath(path, nomObj);
    var { cpath, category, business } = ep;
    cpath = cpath ? cpath[cpath.length - 1] : null;
    //if (typeof category === 'object') type += 1;
    if (category) type += 1;
    if (cpath) {
      if (category.map) type += 1;
      if (business && business.length > 3) type += 1;
    }
    return type - 1;
  }
  docAtPath(path) {
    //const nomObj = this.dataColl[root];
    const nomObj = nomenclature;
    if (!nomObj) return;
    //if (this.memoize(path)) this.setData('fcIndex3.1415', '0');
    //IDs of DOCS as img file names
    var { cpath, category, business } = this.evalPath(path, nomObj);
    var type = this.urlTargetType(path, { cpath, category, business });
    cpath = cpath ? cpath[cpath.length - 1] : null;
    switch (type) {
      case types['tiles']:
      case types['listing']:
        this.fetchDoc(db.collection(cname).where('path', '==', category), path);
        break;
      case types['page']:
        this.fetchDoc(
          db
            .collection(cname)
            .where('name', '==', business)
            .where('path', '==', cpath),
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
  componentDidMount() {
    // this.getImageUrls();
    //this.getImages(storage, );
  }
  // componentDidMount() {
  //   this.fetchDoc(db.collection(ccname).doc(ccname), () =>
  //     this.docAtPath(this.props.location.pathname)
  //   );
  //   console.log('cdm');
  // }
  render() {
    const path = this.props.location.pathname;
    //console.log(this.dataColl[path]);
    document.title = 'AgDial:' + this.title;
    var cont = <span>{'Loading please wait.'}</span>;
    const ut = this.urlTargetType(path);
    console.log(ut);
    if (this.dataColl[path]) {
      const data = this.dataColl[path];
      switch (ut) {
        case types['tiles']:
          cont = <Tiles path={path} data={data} imageUrls={this.dataColl[imageUrls]} />;
          break;
        case types['listing']:
          cont = <Listing path={path} data={data} imageUrls={this.dataColl[imageUrls]} />;
          break;
        case types['page']:
          cont = <Business path={path} data={data} imageUrls={this.dataColl[imageUrls]} />;
          break;
        default:
          break;
      }
    }
    return <AppBody active={0}>{cont}</AppBody>;
  }
}

export default App;
