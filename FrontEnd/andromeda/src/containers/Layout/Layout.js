import React, { Component } from 'react';
import classes from './Layout.module.css';
import Topbar from '../../components/Topbar/Topbar';
import {withRouter} from 'react-router-dom';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.location.pathname !== '/auth/signin' && this.props.location.pathname !== '/auth/signup' ? <Topbar /> : null}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

export default withRouter(Layout);
