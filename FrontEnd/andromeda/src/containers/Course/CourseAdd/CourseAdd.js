import React, { Component } from 'react';
import classes from './CourseAdd.module.css';
import { connect } from 'react-redux';
import * as coursesActions from '../../../store/actions/index';

class CourseAdd extends Component {
    state = {
        courseData: {

        }
    }
    componentDidMount() {
        document.body.style.backgroundColor = '#f1f1f4';

        if (!localStorage.getItem('token')) {
            this.props.history.push('/auth/signin');
        }
    }

    componentDidUpdate() {
        if(this.props.user) {
            if(this.props.user.role !== 'professeur') {
                this.props.history.push('/');
            }
        }
    }

    render() {
        return (
            <div className={classes.CourseAdd}>
                CourseAdd
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCourses: () => dispatch(coursesActions.coursesAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseAdd);
