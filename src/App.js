import React, { Component } from 'react';
import logo from 'resources/logo.png';
import 'resources/App.css';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';

var config= {
  apiKey: "AIzaSyDHwdhlccQ0dxYJabYhhvkVJW4NzDu8xiI",
  authDomain: "agdial-001.firebaseapp.com",
  databaseURL: "https://agdial-001.firebaseio.com",
  projectId: "agdial-001",
  storageBucket: "",
  messagingSenderId: "992136334351"
}
firebase.initializeApp(config)
const db = firebase.firestore();
db.settings({timestampsInSnapshots:true})

db.collection("users").add({
  first: "Alan",
  middle: "Mathison",
  last: "Turing",
  born: 1912
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

class App extends Component {
    render() {
        const { location } = this.props;
        db.collection("users").get().then((q)=>
      {
        q.forEach(item=>console.log(item))
      });
    return (
      <div className="App">
        <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" /> </Link>
          <h1 className="App-title">Welcome to AgDial</h1>
        </header>
        <p className="App-intro">
          <code>{location.pathname}</code>
        </p>
      </div>
    );
  }
}

export default App;
