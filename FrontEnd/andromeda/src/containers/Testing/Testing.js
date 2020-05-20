import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import classes from './Testing.module.css';

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
        this.setState({loading: true});
        axios.get('http://localhost:8000/api/auth/discussion', this.props.user)
        .then(response => {
          console.log(response.data);
          this.setState({loading: false});
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false});
            this.props.history.push({
                pathname: '/error',
                state: {
                    error: error
                }
              });
        })
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
                <div className={classes.DashboardGreeting}>
                    Page de test pour les requêtes Backend.<br/>
                </div>
                <br/>
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
