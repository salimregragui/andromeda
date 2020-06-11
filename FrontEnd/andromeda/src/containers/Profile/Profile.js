import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import ProfileLogged from '../../components/Profile/Profile';
import ProfileUser from '../../components/Profile/ProfileUser/ProfileUser';
import {connect} from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import axios from 'axios';

class Profile extends Component {
    state = {
        progressionLoaded: true,
        selectedUser: null
    }
    componentDidMount() {
        document.body.style.backgroundColor = '#f1f1f4';

        if (!this.props.progression) {
            this.setState({progressionLoaded: false});
        } 
    }

    componentDidUpdate() {
        if(this.props.logged && !this.state.progressionLoaded) {
            console.log("get progression !");
            this.props.onGetProgression();
            this.setState({progressionLoaded: true});
        }
    }

    getSelectedUserHandler = (name) => {
        console.log("okay !");
        axios.get('http://localhost:8000/api/auth/user/' + name.split('-').join(' '), this.props.user)
        .then(response => {
            this.setState({selectedUser:response.data.User});  
            console.log(response.data.User);
        })
        .catch(error => {
            console.log(error);
        })
    }

    imageChangedNotification = () => {
        this.props.onAddNotification({
            'type': 'success',
            'content': 'Photo de profile changée avec succès !',
            'seen': false,
            'displayed': false
        });
    }

    render() {
        let routes = null;

        if (this.props.user) {
            routes = <Switch>
                <Route path="/profile/" exact render={() => <ProfileLogged user={this.props.user} progression={this.props.progression} onImageChange ={(token, user) => {this.props.onGetUser(token, user)}} onImageChangedNotification = {this.imageChangedNotification}/>} />
                <Route path="/profile/:userName" render={() =><ProfileUser user={this.state.selectedUser} getUser={(name) => {this.getSelectedUserHandler(name)}} />} />
            </Switch>
        }
        return (
            <div>
                {routes}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        progression: state.courses.progression
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProgression: () => dispatch(coursesActions.coursesProgression()),
        onGetUser: (token, user) => dispatch(coursesActions.authSuccess(token, user)),
        onAddNotification: (notif) => dispatch(coursesActions.addNotification(notif))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
