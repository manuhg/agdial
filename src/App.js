import React, {Component} from 'react';
import 'resources/App.css';
import AppBody from 'components/AppBody';
import db from 'db';
const ccname='categories'; //categories collection name
const bcname='businesses';
class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={width:0,height:0,data:[]}
  }
  async getDoc(docref,cb)
  {
    console.log(docref)
    var data=await docref.get();
    if(data.exists)
      data=data.data();
    else
      data=null;
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
    // if(!cpath || !cpath.length)
    //   return {'cpath':null,'category':null,'business':null};
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
    console.log("dap",cpath,category,business)
    
    if(cpath && category)
    {
      if(business&&business.length>3)
        this.getDoc(db.collection(bcname).where("name","==",business).where("category","==",cpath));

      else if(typeof(category)==="object" && !category.map) //if its a plain object
        this.setState({'data':[this.state.data[0], category]});//Object.entries(category).map(e=>e[0])]});
      
      else
        this.getDoc(db.collection(bcname).where("category","==",cpath));

      // if(category.map)//if it's an array
      //   this.setState({'data':[this.state.data[0],category]}); 
    }
    else if(category)
    {
      this.setState({'data':[this.state.data[0], category]});//Object.entries(category).map(e=>e[0])]});
    }
  }
  render() {
    console.log("r",this.state);
    if(!this.state.data[1])
      return (
        <AppBody>
         <code>Loading please wait..</code>
        </AppBody>
      );
    return (
      <AppBody >
        {/* <code><ul>{this.state.data[1].map((l,i)=><li key={i}>{l}</li>)}</ul></code> */}
        <code><ul>{Object.entries(this.state.data[1]).map((l,i)=><li key={i}>{l[0]}<ol>{l[1].map((ll,j)=><li key={j}>{ll}</li>)}</ol></li>)}</ul><br/><br/></code>
      </AppBody>
    );
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
