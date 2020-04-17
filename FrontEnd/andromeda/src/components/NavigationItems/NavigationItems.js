import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => {
    let allItems = (
        <React.Fragment>
            <NavigationItem link="/auth/signin" exact>Connexion</NavigationItem>
            <NavigationItem link="/auth/signup" exact>Inscription</NavigationItem>
        </React.Fragment>
    );

    if (localStorage.getItem('token')) {
        allItems = (
            <React.Fragment>
                <NavigationItem link="/dashboard" exact>Dashboard</NavigationItem>
                <NavigationItem link="/profil" exact>Profil</NavigationItem>
                <NavigationItem link="/auth/logout" exact>Deconnexion</NavigationItem>
            </React.Fragment>
        );
    }
    return (
        <ul className={classes.NavigationItems}>
            {allItems}
        </ul>
    )
}

export default NavigationItems;
