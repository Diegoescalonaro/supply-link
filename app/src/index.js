import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
/* React Components */
import Home from './components/Home';
import Cliente from './components/Cliente';
import Proveedor from './components/Proveedor';
/* React Router */
// import {Router, Route, IndexRoute} from 'react-router';
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
 
ReactDOM.render(
    <Router>
      <Switch>
      <Route path='/home' component={Home} exact={true}/>
      <Route path="/cliente/" component={Cliente}/>
      <Route path="/proveedor/" component={Proveedor}/>
      <Redirect to='/home' />
      </Switch>
    </Router>, document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
