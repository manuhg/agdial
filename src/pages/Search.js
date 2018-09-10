import axios from 'axios';
import React, { Component } from 'react';
import AppBody from 'components/AppBody';
import Listing from 'components/Listing';
import Tiles from 'components/Tiles';
import SubCatTile from 'components/SubCatTile';
import { rnom } from 'resources/nomenclature';
import RestDoc from 'utils/Rest';

const algSearchKey = '87419dd78ee5b05c8567bb03f9c910bc';
const algAppId = '76YGED1NMJ';
const algIndex = 'listings';
const alg_url = 'https://' + algAppId + '-dsn.algolia.net/1/indexes/' + algIndex + '/query';
var item_types = { premium_listings: 1, listings: 2, subcategories: 3, categories: 4 };
var w = window,
  d = document,
  documentElement = d.documentElement,
  body = d.getElementsByTagName('body')[0],
  width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

class Search extends Component {
  counter(obj, item) {
    var type = '';
    if (item.prefix) type = 'premium_listings';
    else if (item.catcode) {
      if (item.path === 'CAT') type = 'categories';
      else type = 'subcategories';
    } else type = 'listings';
    obj[type][item.id] = item.id;
    return obj;
  }

  async get_doc(id, collection) {
    collection = collection || 'listings';
    const path = collection + '/' + id;
    if (this.dataColl[path]) return this.dataColl[path];
    this.dataColl[path] = 'Fetching ' + path;
    console.log(this.dataColl[path]);
    var data = await this.REST.getDoc(path);
    data = this.REST.processDoc(data);
    this.dataColl[path] = data;
    console.log('Done fetching', path);
    return data;
  }
  constructor(props) {
    super(props);
    this.dataColl = {};
    this.REST = new RestDoc();
    this.state = { data: '', disp_lst: [] };
    this.search_text = '';
    this.counter = this.counter.bind(this);
    this.display_item = this.display_item.bind(this);

    this.search_init();
    this.search();
  }
  search_init() {
    this.alg_instance = axios.create({
      baseURL: alg_url,
      headers: { 'X-Algolia-API-Key': algSearchKey, 'X-Algolia-Application-Id': algAppId },
    });
    try {
      this.search_text = this.props.location.search.slice(1, -1).split('=')[1] || '';
    } catch (error) {
      this.search_text = '';
      console.log(error);
    }
    //if (this.search_text) this.search(this.search_text);
  }
  search(query) {
    query = query || this.search_text;
    if (!query) return;
    this.alg_instance.post(alg_url, { params: 'query=' + query + '&hitsPerPage=5000' }).then(data => {
      if (data && data.data && data.data.hits) {
        //this.setState({ data: data.data.hits });
        this.process_results(data.data.hits);
      }
    });
  }
  process_results(data) {
    var items_obj = { premium_listings: {}, listings: {}, categories: {}, subcategories: {} };
    var types_order = ['categories', 'subcategories', 'premium_listings', 'listings'];
    var data_dict = {},
      disp_lst = [];
    data = data || this.state.data;
    if (!data) return;

    items_obj = data.reduce(this.counter, items_obj);
    data_dict = data.reduce((a, e) => {
      if (!e.prefix) a[e.id] = e;
      return a;
    }, {});
    var Premiums = Object.values(items_obj.premium_listings).map(id => [id, data_dict[id]]);

    var p_to_fetch = Premiums.filter(e => !e[1]);
    var doc_promises = p_to_fetch.map(e => this.get_doc(e[0]));
    Promise.all(doc_promises).then(docs => {
      docs.map(d => {
        items_obj.premium_listings[d.id] = d.id;
        data_dict[d.id] = d;
      });
      types_order.map(itype => Object.values(items_obj[itype]).map(e => disp_lst.push([data_dict[e], itype])));
      this.setState({ disp_lst: disp_lst });
    });
  }
  display_item(item, index) {
    const data = item[0];
    var type = item[1];
    try {
      if (!data) return <span>&nbsp;</span>;
      if (!type) {
        if (data.catcode) {
          if (data.path === 'CAT') type = item_types['categories'];
          else type = item_types['subcategories'];
        } else type = item_types['listings'];
      }

      switch (type) {
        case item_types['categories']:
          return <Tiles key={index} data={data} />;
        case item_types['subcategories']:
          return <SubCatTile key={index} data={data} />;
        case item_types['listings']:
          return <Listing key={index} width={width} data={data} parent={rnom[data.path]} />;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { disp_lst } = this.state;
    console.log(disp_lst);
    if (!disp_lst || !disp_lst.length) {
      //this.process_results();
      return (
        <AppBody>
          <div style={{ height: '300px' }}>&nbsp;</div>
          <h3>Please type in the search box to see the results</h3>
        </AppBody>
      );
    }

    return <AppBody>{disp_lst.map((item, i) => this.display_item(item, i))}</AppBody>;
  }
}
export default Search;
