import React, { Component } from 'react';
import SignIn from '../../components/Authentification/SignIn/SignIn';
import SignUp from '../../components/Authentification/SignUp/SignUp';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/index';
import Logout from './Logout/Logout';
import Spinner from '../../components/UI/Spinner/Spinner';
import {motion} from 'framer-motion';

class Authentification extends Component {
    state = {
        signIn: {
            email: '',
            password: ''
        },
        signUp: {
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        },
        errors: []
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#ffffff';
        
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
        const signUpData = {
            email: this.state.signUp.email,
            password: this.state.signUp.password,
            username: this.state.signUp.username
        }
        this.props.onRegister(signUpData);
    }

    pageVariants = {
        initial: {
            opacity: 0,
            x: "-100%"
        },
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: "100%"
        }
    }

    pageTransition = {
        type: "tween",
        duration: 0.6
    }

    render() {
        let error = null;
        let redirect = null;

        if (this.props.error) {
            error = (<div>{this.props.error.message}</div>);
        }

        let spinner = null;
        if (this.props.loading)
        {
            spinner= <Spinner />;
        }

        if (this.props.logged && localStorage.getItem('token'))
        {
            redirect = <Redirect to={
                {
                    pathname: "/dashboard",
                    state: {
                        from: this.props.location.pathname
                    }
                }
            } />
        }
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition}>
                {spinner}
                {error}
                {redirect}
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
                                username={this.state.signUp.username}
                                changed={this.changedSignUpHandler}
                                submitedSignUp={this.submitSignUpHandler}/>} 
                    />

                    <Route path="/auth/logout" component={Logout} />
                </Switch>
            </motion.div>
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
        onRegister: (signUpData) => dispatch(authActions.register(signUpData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentification);
