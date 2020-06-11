import React, { Component } from 'react';
import {motion} from 'framer-motion';
import {NavLink} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import Course from '../../components/Course/Course';
import CourseSmall from '../../components/Course/CourseSmall/CourseSmall';
import classes from './Dashboard.module.css';
import CustomLoading from '../../components/UI/CustomLoading/CustomLoading';

class Dashboard extends Component {
    state = {
        loading: false,
        data: false,
        coursesLoaded: true,
        progressionLoaded: true
    }

    componentDidMount() {
        document.body.style = 'background: #f1f1f4;';
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

    coursesChoicesHandler = (name) => {

    }

    redirectToCourseHandler = (event) => {
        const name = event.target.getAttribute('name');

        this.props.history.push('/course/' + name.split(' ').join('-'));
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
        duration: 0.4
    }

    render() {
        let spinner = null;
        let courses = null;
        let progression = null;

        if (this.state.loading) {
            spinner = <Spinner />
        }

        if (this.props.courses) {
            courses = this.props.courses.map(course => (
                <Course key={course.id}
                               name={course.name}
                               image={course.image}
                               nbrLessons={course.numberOfChapter}
                               nbrMinutes="240"
                               clickPlay={(event) => {this.redirectToCourseHandler(event)}}
                               nbrStudents={course.suivis} />
            ));
        }

        if (this.props.progression) {
            console.log(this.props.progression)
            progression = this.props.progression.map(prog => (
                <CourseSmall
                               key={prog.id}
                               name={prog.name}
                               image={prog.image}
                               clickPlay={(event) => {this.redirectToCourseHandler(event)}}
                               nbrLessonsRestantes={prog.progression.chapter_id}/>
            ));
        }
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition}>
                {spinner}
                <br/>
                {this.props.user ? <div className={classes.DashboardGreeting}>
                    Bonjour {this.props.user.name},<br/>
                    <span>Qu'allez vous apprendre aujourd'hui ?</span>
                </div> : <React.Fragment><CustomLoading width="300px"
                            height="30px"
                            marginLeft="50px"
                            marginTop="20px"
                            marginBottom="0px"/>
                         <CustomLoading width="500px"
                            height="30px"
                            marginLeft="50px"
                            marginTop="0px"
                            marginBottom="30px"/>
                        </React.Fragment>
                }
                
                <div className={classes.Choices}>
                    <button style={{color:"#3459D6"}} onClick={() => {this.coursesChoicesHandler('populaires')}}>Populaires</button>
                    <button onClick={() => {this.coursesChoicesHandler('nouveaux')}}>Nouveaux</button>
                    <button onClick={() => {this.coursesChoicesHandler('tendance')}}>Tendance</button>
                </div>

                {courses}
                <br/>
                <div className={classes.Progression}>
                    <h1>Progression</h1>
                    <NavLink to='/classes' exact>Voir tout</NavLink>

                    {progression}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
