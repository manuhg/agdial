import React, {Component} from 'react';
import logo from 'resources/logo.png';
import 'resources/App.css';
import AppBody from 'components/AppBody'
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyDHwdhlccQ0dxYJabYhhvkVJW4NzDu8xiI",
  authDomain: "agdial-001.firebaseapp.com",
  databaseURL: "https://agdial-001.firebaseio.com",
  projectId: "agdial-001",
  storageBucket: "",
  messagingSenderId: "992136334351"
}
firebase.initializeApp(config)
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true})

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={width:0,height:0};
  }
  render() {
    const {location} = this.props;
    db.collection("users").get().then((q) => 
    {
        q.forEach(item => console.log(item))
      });
    return (
      <AppBody >
        <code>{location.pathname}</code>
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
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default App;
