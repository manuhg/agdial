import axios from 'axios';
var baseURL = 'https://firestore.googleapis.com/v1beta1/projects/agdial-001/databases/(default)/documents';
class RestDoc {
  rv(obj) {
    if (obj && obj.arrayValue) return obj.arrayValue.values.map(a => this.rv(a));
    return Object.values(obj)[0];
  }

  static getdoc(docpath) {
    docpath = docpath || 'listings/AH-CB-012';
    axios({
      method: 'get',
      url: baseURL + '/' + docpath + '?fields=fields',
    }).then(val => console.log('GET url: ', val && val.data && val.data.fields ? val.data.fields : val));
  }
  static query(field_path, op, field_val, collection) {
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
      url: baseURL + ':runQuery?fields=document',
      data: query_obj,
    }).then(val => console.log('POST query: ', val && val.data ? val.data : val));
  }
}
export default RestDoc;
/*
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
