import React from 'react';
import classes from './Topbar.module.css';
// import Logo from '../../assets/images/logo-name.svg';
import SearchBar from '../../containers/SearchBar/SearchBar';
import profilePic from '../../assets/images/profile.jpg';
import { withRouter, NavLink } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';

const Topbar = (props) => {
    let goToProfile = () => {
        props.history.push('/profile');
    }

    let navigation = <NavigationItems />;

    if (localStorage.getItem('token')) {
        navigation = <div className={classes.Profile} onClick={goToProfile}>
            <span>{JSON.parse(localStorage.getItem('user')).name}</span>
            <div className={classes.ProfileImg} style={{backgroundImage: "url(" + profilePic + ")"}}></div>
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
