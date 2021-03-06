import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropertiesCatalogComponent from './components/PropertiesCatalogComponent/PropertiesCatalogComponent.js'
import MyPropertiesComponent from './components/MyPropertiesComponent/MyPropertiesComponent.js'
import CreatePropertyComponent from './components/CreatePropertyComponent/CreatePropertyComponent';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Root = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={ PropertiesCatalogComponent } />
      <Route exact path='/my-properties' component={ MyPropertiesComponent } />
      <Route exact path='/post-property' component={ CreatePropertyComponent } />
    </Switch>
  </Router>
)


ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
