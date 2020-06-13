import React from 'react';
import classes from './Topbar.module.css';
import SearchBar from '../../containers/SearchBar/SearchBar';
import Notifications from '../../containers/Notifications/Notifications';
import { withRouter } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';

const Topbar = (props) => {
    let goToProfile = () => {
        props.history.push('/profile');
    }

    let image = <div className={classes.ProfileImg} style={{backgroundImage: "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
    let navigation = <NavigationItems />;

    if (props.user) {
        if (props.user.image) {
            image = <div className={classes.ProfileImg} style={{backgroundImage: "url('http://localhost:8000/storage/images/" + props.user.image + "')"}}></div>
        }
    }

    if (localStorage.getItem('token')) {
        navigation = <div className={classes.Profile} onClick={goToProfile}>
            <span>{JSON.parse(localStorage.getItem('user')).name}</span>
            {image}
        </div>
    }
    return (
        <header className={classes.Topbar}>
            <div className={classes.Logo}>
                <span><li>andro</li>meda</span>
            </div>

            <SearchBar />
            <Notifications />

            <nav>
                {navigation}
            </nav>
        </header>
    )
}

export default withRouter(Topbar);
