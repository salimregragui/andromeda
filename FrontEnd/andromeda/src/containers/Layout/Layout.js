import React, { Component } from 'react';
import classes from './Layout.module.css';
import Topbar from '../../components/Topbar/Topbar';

export default class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Topbar />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
