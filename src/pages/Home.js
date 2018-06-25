import React, {Component} from 'react';
import 'resources/App.css';
import db from 'utils/db';

import Tiles from 'components/Tiles';
import Listing from 'components/Listing';
import Business from 'components/Business';

const ccname='categories'; //categories collection name
const bcname='businesses';
const types={'tiles':0,'listing':1,'page':2}

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={data:[]}
    this.type=0;//tiles
  }
  async getDoc(docref,cb)//cb should be truthy for documents, else it is querysnapshot
  {
    var data=await docref.get();
    if (cb) {
      if (data.exists)
        data = data.data();
      else
        data = null;
    }
    else {
      var dt = {}
      if (!data.empty)
        data.forEach((d) => {
          if (d.exists)
            dt[d.id] = d.data();
        })
      data=dt;
    }
    var newData;
    if(!this.state.data[0])
      newData=[data[ccname]];
    else
      newData=[this.state.data[0],data];
    data=newData;
    this.setState({data});
    if(cb)
      cb();
  }
  valueAtPath(obj, path,isArr) {
    var pa = (isArr)?path:path.split('/').filter(Boolean);
    if(!pa.length)return obj;
    return pa.reduce((e, y) => (e && e[y]) ? e[y] : null, obj);
  }
  
  splitPath(path,catObj)
  {
    //  make '/categories/abc/xyz' => '/abc/xyz'
    var business=null;
    var cpath=path.split('/').filter(Boolean);
    cpath.splice(0,1);
    var category=this.valueAtPath(catObj,cpath,true);
    if(category)
      return {cpath,category,business};
    business = cpath.pop();
    category=this.valueAtPath(catObj,cpath,true);
    if(category)
    return {cpath,category,business};    
  }
  docAtPath(path)
  {
    if(!this.state.data[0])return;
    var {cpath,category,business}=this.splitPath(path,this.state.data[0]);
    cpath=(cpath)?cpath[cpath.length-1]:null;
    
    if(cpath && category)
    {
      if(business&&business.length>3)
      {
        this.getDoc(db.collection(bcname).where("name","==",business).where("category","==",cpath));
        this.type=types['page']
      }
      else if(typeof(category)==="object" && !category.map) //if its a plain object
      {
        this.setState({'data':[this.state.data[0], category]});//Object.entries(category).map(e=>e[0])]});
        this.type=types['tiles']
      }
      else
      {
        this.getDoc(db.collection(bcname).where("category","==",cpath));
        this.type=types['listing']
      }
      // if(category.map)//if it's an array
      //   this.setState({'data':[this.state.data[0],category]}); 
    }
    else if(category)
    {
      this.setState({'data':[this.state.data[0], category]});//Object.entries(category).map(e=>e[0])]});
      this.type=types['tiles']
    }
  }
  componentDidMount() {
    this.getDoc(db.collection(ccname).doc(ccname),()=>this.docAtPath(this.props.location.pathname));
  }
  render() {
    console.log(this.props)
    var cont=<code>Loading please wait..</code>;
    if(this.state.data[1])
    {
      const data=this.state.data[1];
      switch(this.type)
      {
        case types['tiles']:
        cont=<Tiles path={this.props.location.pathname} data={data}/>
        break;
        case types['listing']:
        cont=<Listing path={this.props.location.pathname} data={data}/>
        break;
        case types['page']:
        cont=<Business path={this.props.location.pathname} data={data}/>
        break;
        default:break;
      }
    }
    return cont;    
  }
}

export default App;
