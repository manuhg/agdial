import React, { Component } from 'react';
class Search extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.search_text = '';
    try {
      var st = window.location.search.slice(1, -1).split('=')[1] || '';
      this.search_text = decodeURI(st);
    } catch (error) {
      console.log(error);
    }
  }
  redirect() {
    var text = document.getElementById('sinp').value;
    console.log(text);
    window.location = '/search?query=' + text + '&';
  }
  componentDidMount() {
    if (this.search_text) document.getElementById('sinp').value = this.search_text;
  }
  render() {
    return (
      <div className="fp" style={{ backgroundColor: 'green', height: '55px', marginBottom: '10px' }}>
        <div className="container-fluid mzpz">
          <div className="row mzpz">
            <div className="mzpz col-10 col-sm-11">
              <input
                autoFocus
                style={{ height: '40px', width: '100%', borderRadius: '0' }}
                className="form-control form-control-sm ml-2"
                type="text"
                id="sinp"
                placeholder="Search"
                aria-label="Search"
                onKeyUp={e => (e.keyCode === 13 ? this.redirect() : undefined)}
              />
            </div>
            <div className="col-2 col-sm-1  text-center">
              <button
                style={{
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  verticalAlign: 'center',
                  alignItems: 'center',
                }}
                className="searchButton text-center"
                onClick={this.redirect}
              >
                <i className="fa fa-search mzpz" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
