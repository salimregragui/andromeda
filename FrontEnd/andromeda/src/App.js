import React, { Component } from 'react';
import {AnimatePresence} from 'framer-motion';
import './App.css';

import Layout from './containers/Layout/Layout';
import Landing from './components/Landing/Landing';
import Authentification from './containers/Authentification/Authentification';
import Dashboard from './containers/Dashboard/Dashboard';
import Classes from './containers/Classes/Classes';
import Tasks from './containers/Tasks/Tasks';
import Course from './containers/Course/Course';
import Testing from './containers/Testing/Testing';
import Resources from './containers/Resources/Resources';
import Discussion from './containers/Discussion/Discussion';
import Profile from './containers/Profile/Profile';
import Admin from './containers/Admin/Admin';
import NotificationsDisplayer from './containers/Notifications/NotificationsDisplayer/NotificationsDisplayer';

import { Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import * as authActions from './store/actions/index';
import {connect} from 'react-redux';

// import Spinner from './components/UI/Spinner/Spinner';
import Error from './components/Error/Error';

class App extends Component {
  state = {
    loading: false
  }
  componentDidMount() {
    // const jwt_secret = 't6SdegimC3cXT3syfikuFxanMGUlhRQiru4Ip71HpE8BeRfBG0i674zNShqdbsSa';
    let token = localStorage.getItem('token');

    if (token) {
      this.setState({loading: true})
      // jwt.verify(token, jwt_secret, function(err, decoded) {
      //   if(err) {
      //     localStorage.removeItem('token');
      //     token = null;
      //   }
      // });
      this.props.onAuthStart();
      axios.post('http://localhost:8000/api/auth/me')
      .then(response => {
        console.log(response);
        this.props.onGetUser(token, response.data);
        this.setState({loading: false})
      })
      .catch(error => {
        this.setState({loading: false})
        localStorage.removeItem('token');
        this.props.history.push({
          pathname: '/error',
          state: {
              error: error
          }
        });
        })
    }
  }

  render() {
    let spinner = null;

    if (this.state.loading) {
      spinner = null
    }
    return (
      <div className="App" style={{overflowX:"hidden"}}>
        {spinner}
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <Switch location={this.props.location} key={this.props.location.pathname}>
              <Route path="/" exact component= {Landing} />
              <Route path="/auth" component= {Authentification} />
              <Route path="/dashboard" component= {Dashboard} />
              <Route path="/course" component= {Course} />
              <Route path="/classes" component= {Classes} />
              <Route path="/tasks" component= {Tasks} />
              <Route path="/ressources" component= {Resources} />
              <Route path="/discussions" component= {Discussion} />
              <Route path="/profile" component= {Profile} />
              <Route path="/admin" component= {Admin} />
              <Route path="/error" component= {Error} />
              <Route path="/test" component= {Testing} />
            </Switch>
          </AnimatePresence>
          <NotificationsDisplayer />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthStart: () => dispatch(authActions.authStart()),
    onGetUser: (token, user) => dispatch(authActions.authSuccess(token, user)),
    onAddNotification: (notif) => dispatch(authActions.addNotification(notif))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
