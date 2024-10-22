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
        let style = null;

        if (this.props.logged) {
            leftBar = <LeftBar user={this.props.user} />
        }

        if (this.props.location.pathname === '/error' || this.props.location.pathname === '/' || this.props.location.pathname === '/auth/signup' || this.props.location.pathname === '/auth/signin') {
            leftBar = null;
            contentClass = classes.Content;
            console.log("heyy");
        } else {
            if (localStorage.getItem('theme') === 'dark') {
                style = {backgroundColor: '#312C40'};
            }
        }
        return (
            <React.Fragment>
                {this.props.location.pathname !== '/auth/signin' && this.props.location.pathname !== '/auth/signup' ? <Topbar user={this.props.user} /> : null}
                {leftBar}
                <main className={contentClass} style={style}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        logged: state.auth.logged,
        user: state.auth.user,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps, null)(withRouter(Layout));
