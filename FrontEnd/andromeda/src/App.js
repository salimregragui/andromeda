import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import Landing from './components/Landing/Landing';
import Authentification from './containers/Authentification/Authentification';
import { Switch, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component= {Landing} />
            <Route path="/auth" component= {Authentification} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
