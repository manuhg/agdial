import React, { Component } from 'react';
import logo from 'resources/logo.png';
import 'resources/App.css';
import { Link } from 'react-router-dom';
class App extends Component {
    render() {
        const { location } = this.props;
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
