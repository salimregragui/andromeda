import React, { Component } from 'react';
import './App.css';
import Layout from './containers/Layout/Layout';
import Landing from './components/Landing/Landing';
import Authentification from './containers/Authentification/Authentification';
import Dashboard from './containers/Dashboard/Dashboard';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import * as authActions from './store/actions/index';
import {connect} from 'react-redux';
import jwt from 'jsonwebtoken';

class App extends Component {

  componentDidMount() {
    const jwt_secret = 't6SdegimC3cXT3syfikuFxanMGUlhRQiru4Ip71HpE8BeRfBG0i674zNShqdbsSa';
    let token = localStorage.getItem('token');

    if (token) {
      jwt.verify(token, jwt_secret, function(err, decoded) {
        if(err) {
          localStorage.removeItem('token');
          token = null;
        }
      });
  
      axios.post('http://localhost:8000/api/auth/me')
      .then(response => {
        console.log(response);
        this.props.onGetUser(token, response.data);
      })
      .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact component= {Landing} />
            <Route path="/auth" component= {Authentification} />
            <Route path="/dashboard" component= {Dashboard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: (token, user) => dispatch(authActions.authSuccess(token, user))
  }
}

export default connect(null, mapDispatchToProps)(App);
