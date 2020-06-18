import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import Landing from './components/Landing'
import Auth from './components/Auth'
import UserList from './components/UserList'

import './icon.config'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path = "/" exact component = { Landing } /> 
        <Route path = "/auth" component = { Auth } />
        <Route path = "/list" component = { UserList } />
      </Switch>
    </div>
  );
}

export default App;
