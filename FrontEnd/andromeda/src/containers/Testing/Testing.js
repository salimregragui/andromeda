import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import classes from './Testing.module.css';
import ReactJson from 'react-json-view'

class Dashboard extends Component {
    state = {
        loading: false,
        data: null
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
    }

    addNotif = () => {
        let types = ['success', 'error', 'info'];
        let randomType = types[Math.floor(Math.random() * types.length)];

        let anysize = 60;//the size of string 
        let charset = "abcdefghijklmnopqrstuvwxyz"; //from where to create
        let result="";
        for( let i=0; i < anysize; i++ ) {
            if (i % 10 === 0) {
                result += ' ';
            } else {
                result += charset[Math.floor(Math.random() * charset.length)];
            }
        }

        this.props.onAddNotification({
          type:randomType,
          content: result,
          displayed: false,
          seen: false
        })
    }

    getData = () => {
        this.setState({loading: true});
        axios.get('https://limitless-wildwood-57587.herokuapp.com/api/auth/quizzes/2', this.props.user)
        .then(response => {
          console.log(response.data);
          this.setState({data:response.data});  
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
                <ReactJson style={{backgroundColor:'white',textAlign:'left',width:'80%',marginLeft:'50px'}} src={this.state.data} />
                <br/>

                <button onClick={this.addNotif}>Ajouter notification</button>
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
        onGetCourses: () => dispatch(coursesActions.coursesAll()),
        onAddNotification: (notif) => dispatch(coursesActions.addNotification(notif))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
