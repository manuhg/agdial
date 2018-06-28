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
};

class App extends Component {
  constructor(props) {
    super(props);
    this.title = 'Home';
    this.state = { data: [] };
    this.dataColl = {};
    this.type = 0; // tiles
  }
  async getDoc(docref, cb) {
    // cb should be truthy for documents, else it is querysnapshot
    var data = await docref.get();
    if (cb) {
      if (data.exists) data = data.data();
      else data = null;
    } else {
      var dt = {};
      if (!data.empty)
        data.forEach(d => {
          if (d.exists) dt[d.id] = d.data();
        });
      data = dt;
    }
    var newData;
    if (!this.state.data[0]) newData = [data[ccname]];
    else newData = [this.state.data[0], data];
    data = newData;
    this.setState({ data });
    if (cb) cb();
  }
  valueAtPath(obj, path, isArr) {
    var pa = isArr ? path : path.split('/').filter(Boolean);
    if (!pa.length) return obj;
    return pa.reduce((e, y) => (e && e[y] ? e[y] : null), obj);
  }
  splitPath(path, catObj) {
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
  docAtPath(path) {
    if (!this.state.data[0]) return;
    if (this.dataColl[path])
      //kinda like memoize
      return this.dataColl[path];

    var { cpath, category, business } = this.splitPath(path, this.state.data[0]);
    cpath = cpath ? cpath[cpath.length - 1] : null;

    if (cpath && category) {
      if (business && business.length > 3) {
        this.getDoc(
          db
            .collection(bcname)
            .where('name', '==', business)
            .where('category', '==', cpath)
        );
        this.type = types['page'];
      } else if (typeof category === 'object' && !category.map) {
        // if its a plain object
        this.setState({ data: [this.state.data[0], category] });
        // Object.entries(category).map(e=>e[0])]});
        this.type = types['tiles'];
      } else {
        this.getDoc(db.collection(bcname).where('category', '==', cpath));
        this.type = types['listing'];
      }
      // if(category.map)//if it's an array
      //   this.setState({'data':[this.state.data[0],category]});
    } else if (category) {
      this.setState({
        data: [this.state.data[0], category],
      }); // Object.entries(category).map(e=>e[0])]});
      this.type = types['tiles'];
    }
  }

  componentWillUnmount() {
    document.title = 'AgDial';
  }
  componentDidMount() {
    this.getDoc(db.collection(ccname).doc(ccname), () =>
      this.docAtPath(this.props.location.pathname)
    );
    console.log('cdm');
  }
  render() {
    console.log(this.props.match);
    document.title = 'AgDial:' + this.title;
    var cont = <span>{'Loading please wait.'}</span>;
    if (this.state.data[1]) {
      const data = this.state.data[1];
      switch (this.type) {
        case types['tiles']:
          cont = <Tiles path={this.props.location.pathname} data={data} />;
          break;
        case types['listing']:
          cont = <Listing path={this.props.location.pathname} data={data} />;
          break;
        case types['page']:
          cont = <Business path={this.props.location.pathname} data={data} />;
          break;
        default:
          break;
      }
    }
    return <AppBody active={0}>{cont}</AppBody>;
  }
}

export default App;
