import React, { Component } from 'react';
import classes from './Layout.module.css';
import Topbar from '../../components/Topbar/Topbar';
import LeftBar from '../../components/UI/LeftBar/LeftBar';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.location.pathname !== '/auth/signin' && this.props.location.pathname !== '/auth/signup' ? <Topbar /> : null}
                {this.props.logged ? <LeftBar /> : null}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        logged: state.auth.logged
    };
};

export default connect(mapStateToProps, null)(withRouter(Layout));
