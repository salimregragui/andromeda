import React, { Component } from 'react';
import classes from './Course.module.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';

import CourseAdd from './CourseAdd/CourseAdd';
import CourseView from './CourseView/CourseView';
import CourseShow from '../../components/Course/Course';

class Course extends Component {
    state = {
        coursesLoaded: true,
        progressionLoaded: true
    }
    componentDidMount() {
        document.body.style.backgroundColor = '#f1f1f4';

        if (!localStorage.getItem('token')) {
            this.props.history.push('/auth/signin');
        }

        if (this.props.location.state)
        {
            if (this.props.logged && this.props.location.state.from === '/auth/signin')
            {
                window.location.reload();
            }
        }

        if (!this.props.courses) {
            this.setState({coursesLoaded: false});
        }
        if (!this.props.progression) {
            this.setState({progressionLoaded: false});
        }
    }

    componentDidUpdate() {
        if(this.props.logged && !this.state.coursesLoaded) {
            console.log("get courses !");
            this.props.onGetCourses();
            this.setState({coursesLoaded: true});
        }

        if(this.props.logged && !this.state.progressionLoaded) {
            console.log("get progression !");
            this.props.onGetProgression();
            this.setState({progressionLoaded: true});
        }
    }

    render() {
        let courses = null;

        if (this.props.courses) {
            courses = <React.Fragment>
                <h1>Tous les cours disponible</h1>
                 {this.props.courses.map(course => (
                    <CourseShow key={course.id}
                                   name={course.name}
                                   nbrLessons={course.numberOfChapter}
                                   nbrMinutes="240"
                                   nbrStudents={course.suivis} />
                ))}
            </React.Fragment>;
        }
        return (
            <div className={classes.Course}>
                <Switch>
                    <Route path="/course/" exact render = {() => { return courses}} />
                    <Route path="/course/add" exact component= {CourseAdd} />
                    <Route path="/course/:courseName" component= {CourseView} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        courses: state.courses.courses,
        progression: state.courses.progression
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCourses: () => dispatch(coursesActions.coursesAll()),
        onGetProgression: () => dispatch(coursesActions.coursesProgression())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);