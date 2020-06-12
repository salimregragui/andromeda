import React, { Component } from 'react';
import * as authActions from '../../../store/actions/index';
import { connect } from 'react-redux';
import {motion} from 'framer-motion';

class Logout extends Component {
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
        transition: "linear",
        duration: 0.6
    }

    componentDidMount() {
        this.props.onLogout();
        this.props.history.push('/');
    }
    render() {
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition}></motion.div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authActions.logout())
    };
}

export default connect(null, mapDispatchToProps)(Logout);
