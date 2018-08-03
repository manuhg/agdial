//import AppBody from 'components/AppBody';
import Home from 'pages/Home';
import About from 'pages/About';
import Pricing from 'pages/Pricing';
import Join from 'pages/JoinUs';
import Contact from 'pages/Contact';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from 'utils/ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    return (
      <Router>
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/categories" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/joinus" component={Join} />
            <Route path="/contact" component={Contact} />
            {/* <Route component={Home} _404={true} /> */}

            {/* <Route exact path={routes[0][0]} component={routes[0][2]} />
            <Route exact path="/categories" component={routes[0][2]} />
            <Route path={routes[1][0]} component={routes[1][2]} />
            <Route path={routes[2][0]} component={routes[2][2]} />
            <Route path={routes[3][0]} component={routes[3][2]} /> */}
            {/*<Route path={routes[4][0]} component={routes[4][2]} />*/}

            {/* {Components.map(
              (Comp, i) =>
                i === 0 ? (
                  <Route key={i} exact path={routes[i][0]} component={() => <Comp />} />
                ) : (
                  <Route key={i} path={routes[i][0]} component={() => <Comp />} />
                )
            )} */}
            {/* <Route path="/contact" component={Contact} /> */}
            {/* <Route component={Home} _404={true} /> */}
          </Switch>
        </ErrorBoundary>
      </Router>
    );
  }
  updateDimensions() {
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({ width, height });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }
}

export default App;
