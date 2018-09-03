import axios from 'axios';

class RestDoc {
  constructor() {
    this.baseURL = 'https://firestore.googleapis.com/v1beta1/projects/agdial-001/databases/(default)/documents';
    this.toJsObj = this.toJsObj.bind(this);
    this.rv = this.rv.bind(this);
  }
  rv(obj) {
    if (obj === undefined || obj == null) return;
    if (obj && obj.arrayValue && obj.arrayValue.values) {
      return obj.arrayValue.values.map(a => this.rv(a));
    }
    return Object.values(obj)[0];
  }
  toJsObj(obj) {
    var r = {};
    if (obj) {
      Object.entries(obj).map(e => (r[e[0]] = this.rv(e[1])));
      return r;
    }
  }
  processDoc(docObj) {
    if (docObj && docObj.data && docObj.data.fields) return this.toJsObj(docObj.data.fields);
  }
  processQuery(docObj) {
    if (docObj && docObj.data) {
      var dt_arr = [];
      dt_arr = docObj.data.map(e => (e && e.document ? e.document.fields : e));
      dt_arr = Object.values(dt_arr).map(this.toJsObj);
      return dt_arr;
    }
  }
  getDoc(docPath) {
    console.log('REST getdoc');
    //console.log('REST doc:', docPath);
    if (docPath)
      return axios({
        method: 'get',
        url: this.baseURL + '/' + docPath + '?fields=fields',
      });
  }
  runQuery(queryObj) {
    console.log('REST runQuery');
    //console.log('REST query:', queryObj);
    if (queryObj)
      return axios({
        method: 'post',
        url: this.baseURL + ':runQuery?fields=document',
        data: queryObj,
      });
  }
}
export default RestDoc;
/*

 getdoc(docpath) {
    docpath = docpath || 'listings/AH-CB-012';
    axios({
      method: 'get',
      url: this.baseURL + '/' + docpath + '?fields=fields',
    }).then(val => {
      var dt_arr = [];
      if (val && val.data && val.data.fields) {
        dt_arr = val.data.fields;

        dt_arr = this.toJsObj(dt_arr);
      }
      console.log('GET url: ', dt_arr);
    });
  }
  query(field_path, op, field_val, collection) {
    field_path = field_path || 'path';
    op = op || 'EQUAL';
    field_val = field_val || 'CAT';
    collection = collection || 'listings';
    var query_obj = {
      structuredQuery: {
        where: {
          fieldFilter: {
            field: {
              fieldPath: field_path,
            },
            op: op,
            value: { stringValue: field_val },
          },
        },
        from: [
          {
            collectionId: collection,
          },
        ],
      },
    };
    axios({
      method: 'post',
      url: this.baseURL + ':runQuery?fields=document',
      data: query_obj,
    }).then(val => {
      var dt_arr = [];
      if (val && val.data) {
        dt_arr = val.data.map(e => (e && e.document ? e.document.fields : e));
        dt_arr = Object.values(dt_arr).map(this.toJsObj);
      }
      console.log('POST query: ', dt_arr);
    });
  }
  
{
 "structuredQuery": {
  "where": {
   "fieldFilter": {
    "field": {
     "fieldPath": "path"
    },
    "op": "EQUAL",
    "value": {
     "stringValue": "CAT"
    }
   }
  },
  "from": [
   {
    "collectionId": "listings"
   }
  ]
 }
}

https://firestore.googleapis.com/v1beta1/projects/agdial-001/databases/(default)/documents:runQuery?key={YOUR_API_KEY}
{ "structuredQuery": {  "where": {   "fieldFilter": {    "field": {     "fieldPath": "path"    },    "op": "EQUAL",    "value": {     "stringValue": "CAT"    }   }  },  "from": [   {    "collectionId": "listings"   } ] }}

https://firestore.googleapis.com/v1beta1/projects/agdial-001/databases/\(default\)/documents/listings
curl https://firestore.googleapis.com/v1beta1/projects/agdial-001/databases/\(default\)/documents/listings/AH-CB-012

Object.entries(temp1).map(e=>{e[0]: e[1]&&e[1].arrayValue?e[1].arrayValue.values:Object.values(e[1])})

*/
/*
function rv(obj) {
  if (obj && obj.arrayValue) return obj.arrayValue.values.map(a => rv(a));
  return Object.values(obj)[0];
}

function getdoc() {
  axios({
    method: 'get',
    url:
      'https://firestore.googleapis.com/v1beta1/projects/agdial-001/databases/(default)/documents/listings/AH-CB-012?fields=fields',
  }).then(val => console.log('GET url: ', val && val.data && val.data.fields ? val.data.fields : val));

  axios({
    method: 'post',
    url:
      'https://firestore.googleapis.com/v1beta1/projects/agdial-001/databases/(default)/documents:runQuery?fields=document',
    data: {
      structuredQuery: {
        where: {
          fieldFilter: {
            field: {
              fieldPath: 'path',
            },
            op: 'EQUAL',
            value: { stringValue: 'CAT' },
          },
        },
        from: [
          {
            collectionId: 'listings',
          },
        ],
      },
    },
  }).then(val => console.log('POST query: ', val && val.data ? val.data : val));
}
*/
