import React, { Component } from 'react';
import { Menu, MainButton, ChildButton } from 'react-mfb';
// import 'react-mfb/mfb.css';
class floatingSocial extends Component {
  render() {
    var effect = 'zoomin',
      pos = 'tr',
      method = 'hover';

    return (
      <Menu effect={effect} method={method} position={pos}>
        <MainButton iconResting="ion-plus-round" iconActive="ion-close-round" />
        <ChildButton
          //onClick={function(e){ console.log(e); e.preventDefault(); }}
          icon="ion-social-github"
          label="View on Github"
          href="https://github.com/manuhg"
        />
        <ChildButton icon="ion-social-octocat" label="Follow me on Github" href="https://github.com/manuhg" />
        <ChildButton
          icon="ion-social-twitter"
          label="Share on Twitter"
          href="http://twitter.com/share?text=Agdial Agricultural Contacts Directory&url=http://agdial.in/&hashtags=agriculture,farming,agriculturedirectory"
        />
      </Menu>
    );
  }
}
export default floatingSocial;
