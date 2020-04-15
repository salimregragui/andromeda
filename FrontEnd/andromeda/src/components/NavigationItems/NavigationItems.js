import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/signin" exact>Connexion</NavigationItem>
            <NavigationItem link="/signup" exact>Inscription</NavigationItem>
        </ul>
    )
}

export default NavigationItems;
