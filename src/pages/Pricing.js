import React, { Component } from 'react';
import AppBody from 'components/AppBody';
class Pricing extends Component {
  constructor(props) {
    super(props);
    this.title = 'Pricing';
  }
  render() {
    const cont = <span>{this.title}</span>;
    document.title = 'AgDial:' + this.title;
    return <AppBody active={2}>{cont}</AppBody>;
  }

  /*componentWillUnmount()
    {
        document.title='AgDial';
    }*/
}
export default Pricing;
