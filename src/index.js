import React from 'react';
import ReactDOM from 'react-dom';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import 'resources/index.css';
import App from 'App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </Router>
, document.getElementById('root'));
registerServiceWorker();