import React, { Component } from 'react';
import SignIn from '../../components/Authentification/SignIn/SignIn';
import SignUp from '../../components/Authentification/SignUp/SignUp';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/index';
import Logout from './Logout/Logout';
import Spinner from '../../components/UI/Spinner/Spinner';

class Authentification extends Component {
    state = {
        signIn: {
            email: '',
            password: ''
        },
        signUp: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        errors: []
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/dashboard');
        }
    }

    changedSignInHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const changedSignIn = {...this.state.signIn}
        changedSignIn[name] = value;

        this.setState({signIn: changedSignIn})
    }

    changedSignUpHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const changedSignUp = {...this.state.signUp}
        changedSignUp[name] = value;

        this.setState({signUp: changedSignUp})
    }

    submitSignInHandler = () => {
        this.props.onAuth(this.state.signIn.email, this.state.signIn.password);
    }

    submitSignUpHandler = () => {
        this.props.onRegister(this.state.signUp.email, this.state.signUp.password);
    }

    render() {
        let error = null;

        if (this.props.error) {
            error = (<div>{this.props.error.message}</div>);
        }

        if (this.props.logged)
        {
            this.props.history.push('/dashboard');
        }

        let spinner = null;
        if (this.props.loading)
        {
            spinner= <Spinner />;
        }
        return (
            <React.Fragment>
                {spinner}
                {error}
                <Switch>
                    <Route path="/auth/signin" render= {() => 
                        <SignIn email={this.state.signIn.email} 
                                password={this.state.signIn.password} 
                                changed={this.changedSignInHandler} 
                                submitedSignIn= {this.submitSignInHandler}/>} 
                    />
                    <Route path="/auth/signup" render= {() => 
                        <SignUp email={this.state.signUp.email}
                                password={this.state.signUp.password}
                                confirmPass={this.state.signUp.confirmPassword}
                                changed={this.changedSignUpHandler}
                                submitedSignUp={this.submitSignUpHandler}/>} 
                    />

                    <Route path="/auth/logout" component={Logout} />
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        error: state.auth.error,
        loading: state.auth.loading,
        logged: state.auth.logged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass) => dispatch(authActions.auth(email, pass)),
        onRegister: (email, pass) => dispatch(authActions.register(email, pass))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentification);
