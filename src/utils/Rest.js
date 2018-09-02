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
*/
