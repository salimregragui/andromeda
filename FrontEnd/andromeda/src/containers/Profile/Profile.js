import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import ProfileLogged from '../../components/Profile/Profile';
import ProfileUser from '../../components/Profile/ProfileUser/ProfileUser';
import {connect} from 'react-redux';
import * as coursesActions from '../../store/actions/index';

class Profile extends Component {
    state = {
        progressionLoaded: true
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

    render() {
        let routes = null;

        if (this.props.user) {
            routes = <Switch>
                <Route path="/profile/" exact render={() => <ProfileLogged user={this.props.user} progression={this.props.progression} />} />
                <Route path="/profile/:userName" component={ProfileUser} />
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
        onGetProgression: () => dispatch(coursesActions.coursesProgression())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
