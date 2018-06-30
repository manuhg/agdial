import 'firebase/firestore';
import firebase from 'firebase/app';

var config = {
  apiKey: 'AIzaSyDHwdhlccQ0dxYJabYhhvkVJW4NzDu8xiI',
  authDomain: 'agdial-001.firebaseapp.com',
  databaseURL: 'https://agdial-001.firebaseio.com',
  projectId: 'agdial-001',
  storageBucket: 'agdial-001.appspot.com',
  messagingSenderId: '992136334351',
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
