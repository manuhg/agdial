import React, { Component } from 'react';
import AppBody from 'components/AppBody';
class Contact extends Component {
  constructor(props) {
    super(props);
    this.title = 'Contact Us';
  }
  render() {
    const cont = <span>{this.title}</span>;
    document.title = 'AgDial:' + this.title;
    return <AppBody active={3}>{cont}</AppBody>;
  }

  /* componentWillUnmount()
    {
        document.title='AgDial';
    }*/
}
export default Contact;
