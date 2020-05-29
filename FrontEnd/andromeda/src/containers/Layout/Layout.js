import React, { Component } from 'react';
import classes from './Layout.module.css';
import Topbar from '../../components/Topbar/Topbar';
import LeftBar from '../../components/UI/LeftBar/LeftBar';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

class Layout extends Component {
    render() {
        let leftBar = null;
        let contentClass = classes.ContentLeftBar;

        if (this.props.logged) {
            leftBar = <LeftBar />
        }

        if (this.props.location.pathname === '/error' || this.props.location.pathname === '/' || this.props.location.pathname === '/auth/signup' || this.props.location.pathname === '/auth/signin') {
            leftBar = null;
            contentClass = classes.Content
        }
        return (
            <React.Fragment>
                {this.props.location.pathname !== '/auth/signin' && this.props.location.pathname !== '/auth/signup' ? <Topbar /> : null}
                {leftBar}
                <main className={contentClass}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        logged: state.auth.logged,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps, null)(withRouter(Layout));
