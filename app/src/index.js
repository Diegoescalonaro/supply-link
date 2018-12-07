import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
/* React Components */
import App from './components/App';
import Perfil from './components/Perfil';
import Header from './components/Header';
/* React Router */
// import {Router, Route, IndexRoute} from 'react-router';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
 
ReactDOM.render(
    <Router>
      <Switch>
      <Route path="/home/" component={App}/>
      <Route path="/perfil/" component={Perfil}/>
      <Route path="/help/" component={Perfil}/>
      </Switch>
    </Router>, document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
