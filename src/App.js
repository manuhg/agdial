import React, {Component} from 'react';
import AppBody from 'components/AppBody';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from 'pages/Home';
import About from 'pages/About';
import Pricing from 'pages/Pricing';
import Contact from 'pages/Contact';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={width:0,height:0}
  }

  render() {
    return (
       <Router>
          <AppBody>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/contact" component={Contact} />
              <Route  component={Home} />
            </Switch>
          </AppBody>
        </Router>
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
}

export default App;
