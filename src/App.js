import React, {Component} from 'react';
import 'resources/App.css';
import AppBody from 'components/AppBody';
//import asyComponent from 'AsyncComponent'
import db from 'db';
// import asyComponent from 'AsyncComponent'
// const Tiles = asyComponent(()=>import('components/Tiles'));
// const Listing = asyComponent(()=>import('components/Listing'));
// const Business = asyComponent(()=>import('components/Business'));
import Tiles from 'components/Tiles';
import Listing from 'components/Listing';
import Business from 'components/Business';
const ccname='categories'; //categories collection name
const bcname='businesses';
const types={'tiles':0,'listing':1,'page':2}
//const db = asyComponent(()=>import('db'))

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={width:0,height:0,data:[]}
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
  render() {
    var cont=<code>Loading please wait..</code>;
    if(this.state.data[1])
    {
      const data=this.state.data[1];
      const w=this.state.width;
      const h=this.state.height;
      switch(this.type)
      {
        case types['tiles']:
        cont=<Tiles path={this.props.location.pathname} width={w} height={h} data={data}/>
        break;
        case types['listing']:
        cont=<Listing path={this.props.location.pathname} width={w} height={h} data={data}/>
        break;
        case types['page']:
        cont=<Business path={this.props.location.pathname} width={w} height={h} data={data}/>
        break;
        default:break;
      }
    }
    return (<AppBody>{cont}</AppBody> );
  }
  updateDimensions()
  {
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({width, height});
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.getDoc(db.collection(ccname).doc(ccname),()=>this.docAtPath(this.props.location.pathname));
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default App;
