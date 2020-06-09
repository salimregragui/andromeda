import React from 'react';
import classes from './Topbar.module.css';
// import Logo from '../../assets/images/logo-name.svg';
import SearchBar from '../../containers/SearchBar/SearchBar';
import { withRouter, NavLink } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';

const Topbar = (props) => {
    let goToProfile = () => {
        props.history.push('/profile');
    }

    let image = <div className={classes.ProfileImg} style={{backgroundImage: "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
    let navigation = <NavigationItems />;

    if (props.user) {
        if (props.user.image) {
            image = <div className={classes.ProfileImg} style={{backgroundImage: "url('" + props.user.image + "')"}}></div>
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
                <span>Andromeda</span>
            </div>

            <SearchBar />
            
            <nav>
                {navigation}
            </nav>
        </header>
    )
}

export default withRouter(Topbar);
