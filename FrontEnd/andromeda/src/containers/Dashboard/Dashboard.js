import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import Course from '../../components/Course/Course';
import classes from './Dashboard.module.css';
import CustomLoading from '../../components/UI/CustomLoading/CustomLoading';

class Dashboard extends Component {
    state = {
        loading: false,
        data: false
    }

    componentDidMount() {
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
    }

    getData = () => {
        // this.setState({loading: true});
        // axios.get('http://localhost:8000/api/auth/discussion', this.props.user)
        // .then(response => {
        //   console.log(response.data);
        //   this.setState({loading: false});
        // })
        // .catch(error => {
        //     console.log(error)
        //     this.setState({loading: false});
        //     this.props.history.push({
        //         pathname: '/error',
        //         state: {
        //             error: error
        //         }
        //       });
        // })
        this.props.onGetCourses();
    }
    render() {
        let spinner = null;
        if (this.state.loading) {
            spinner = <Spinner />
        }
        return (
            <div>
                {spinner}
                <br/>
                <button onClick={this.getData}>Get Data</button>
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
                {this.props.courses ? <React.Fragment><Course name="User Experience" 
                        nbrLessons="16"
                        nbrMinutes="240"
                        nbrStudents="100"/>
                <Course name="Html & Css" 
                        nbrLessons="11"
                        nbrMinutes="127"
                        nbrStudents="1430"/>
                <Course name="Javascript (ES5, ES6, Ajax...)" 
                        nbrLessons="42"
                        nbrMinutes="730"
                        nbrStudents="7240"/>
                <Course name="Git & Github" 
                        nbrLessons="8"
                        nbrMinutes="90"
                        nbrStudents="1512"/></React.Fragment> :
                        <React.Fragment>
                            <CustomLoading width="700px"
                            height="80px"
                            marginLeft="50px"
                            marginTop="0px"
                            marginBottom="20px"/>
                            <CustomLoading width="700px"
                            height="80px"
                            marginLeft="50px"
                            marginTop="0px"
                            marginBottom="20px"/>
                            <CustomLoading width="700px"
                            height="80px"
                            marginLeft="50px"
                            marginTop="0px"
                            marginBottom="20px"/>
                        </React.Fragment>}
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        courses: state.courses.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCourses: () => dispatch(coursesActions.coursesAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
