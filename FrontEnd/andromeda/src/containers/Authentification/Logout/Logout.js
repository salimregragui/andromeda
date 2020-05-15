import React, { Component } from 'react';
import * as authActions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <React.Fragment></React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authActions.logout())
    };
}

export default connect(null, mapDispatchToProps)(Logout);
