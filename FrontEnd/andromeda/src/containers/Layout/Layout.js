import React, { Component } from 'react';
import classes from './Layout.module.css';
import Topbar from '../../components/Topbar/Topbar';
import LeftBar from '../../components/UI/LeftBar/LeftBar';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import CustomLoading from '../../components/UI/CustomLoading/CustomLoading';

class Layout extends Component {
    render() {
        let leftBar = null;

        if (this.props.logged) {
            leftBar = <LeftBar />
        }

        if (this.props.loading) {
            leftBar = <CustomLoading width="240px"
                        height="600px"
                        marginLeft="0px"
                        marginTop="0px"
                        marginBottom="0px"
                        float="left"/>
        }
        return (
            <React.Fragment>
                {this.props.location.pathname !== '/auth/signin' && this.props.location.pathname !== '/auth/signup' ? <Topbar /> : null}
                {leftBar}
                <main className={classes.Content}>
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
