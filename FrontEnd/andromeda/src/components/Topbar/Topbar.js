import React from 'react';
import classes from './Topbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
// import Logo from '../../assets/images/logo-name.svg';
import SearchBar from '../../containers/SearchBar/SearchBar';

const Topbar = () => {
    return (
        <header className={classes.Topbar}>
            <div className={classes.Logo}>
                <span>Andromeda</span>
            </div>

            <SearchBar />
            
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Topbar;
