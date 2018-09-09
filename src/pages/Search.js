import axios from 'axios';
import React, { Component } from 'react';
import AppBody from 'components/AppBody';

const algSearchKey = '87419dd78ee5b05c8567bb03f9c910bc';
const algAppId = '76YGED1NMJ';
const algIndex = 'listings';
const alg_url = 'https://' + algAppId + '-dsn.algolia.net/1/indexes/' + algIndex + '/query';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
    this.search_text = '';
    try {
      this.search_text = this.props.location.search.slice(1, -1).split('=')[1];
    } catch (error) {
      console.log(error);
    }
    this.alg_instance = axios.create({
      baseURL: alg_url,
      headers: { 'X-Algolia-API-Key': algSearchKey, 'X-Algolia-Application-Id': algAppId },
    });
    if (this.search_text) this.search(this.search_text);
  }
  search(query) {
    this.alg_instance
      .post(alg_url, { params: 'query=' + query + '&hitsPerPage=5000' })
      .then(data => (data && data.data && data.data.hits ? this.setState({ data: data.data.hits }) : undefined));
  }

  render() {
    const data = this.state.data;
    if (!data)
      return (
        <AppBody>
          <span>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>Please type in the search box to see the results</h3>
          </span>
        </AppBody>
      );
    document.getElementById('sinp').value = this.search_text;
    console.log(data);
    return <AppBody>{data.map((hit, i) => <div key={i}>{hit.name || hit.prefix}</div>)}</AppBody>;
  }
}
export default Search;
