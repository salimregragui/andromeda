import React, { Component } from 'react';
import SignIn from '../../components/Authentification/SignIn/SignIn';
import SignUp from '../../components/Authentification/SignUp/SignUp';
import { Switch, Route } from 'react-router-dom';

export default class Authentification extends Component {
    state = {
        email: '',
        password: ''
    }

    emailChangedHandler = (event) => {
        this.setState({email: event.target.value});
        console.log(this.state);
    }

    passChangedHandler = (event) => {
        this.setState({password: event.target.value});
        console.log(this.state);
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/auth/signin" render= {() => <SignIn email={this.state.email} password={this.state.password} changedEmail={this.emailChangedHandler} changedPass={this.passChangedHandler} />} />
                    <Route path="/auth/signup" component= {SignUp} />
                </Switch>
            </React.Fragment>
        );
    }
}
