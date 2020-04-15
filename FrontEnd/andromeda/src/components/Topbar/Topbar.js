import React from 'react';
import classes from './Topbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const Topbar = () => {
    return (
        <header className={classes.Topbar}>
            <div className={classes.Logo}>
                <span>Andromeda</span>
            </div>

            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Topbar;
