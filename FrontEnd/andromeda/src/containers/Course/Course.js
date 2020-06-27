import React, { Component } from 'react';
import classes from './Course.module.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import {motion} from 'framer-motion';

import CourseAdd from './CourseAdd/CourseAdd';
import CourseView from './CourseView/CourseView';
import CourseShow from '../../components/Course/Course';

class Course extends Component {
    state = {
        coursesLoaded: true,
        progressionLoaded: true
    }
    componentDidMount() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.style.backgroundColor = '#312C40';
        } else {
            document.body.style = 'background: #f1f1f4;';
        }

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
        duration: 0.6
    }

    render() {
        let courses = null;

        if (this.props.courses) {
            courses = <React.Fragment>
                <h1 style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>Tous les cours disponible</h1>
                 {this.props.courses.map(course => (
                    <CourseShow key={course.id}
                                   name={course.name}
                                   image={course.image}
                                   nbrLessons={course.numberOfChapter}
                                   nbrMinutes={course.numberOfChapter * 12}
                                   nbrStudents={course.suivis} />
                ))}
            </React.Fragment>;
        }
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition} className={classes.Course}>
                <Switch>
                    <Route path="/course/" exact render = {() => { return courses}} />
                    <Route path="/course/add" exact component= {CourseAdd} />
                    <Route path="/course/:courseName" component= {CourseView} />
                </Switch>
            </motion.div>
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
