import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './LeftBar.module.css';
import homeIcon from '../../../assets/images/home-icon.svg';
import discussionIcon from '../../../assets/images/discussion-icon.svg';
import tasksIcon from '../../../assets/images/tasks-icon.svg';
import ressourcesIcon from '../../../assets/images/ressources-icon.svg';
import classesIcon from '../../../assets/images/classes-icon.svg';

const LeftBar = () => {
    return (
        <div className={classes.LeftBar}>
            <div className={classes.Logo}>
                <span>Andromeda</span>
            </div>

            <h3 className={classes.mainMenu}>Main Menu</h3>
            <NavLink
                to="/dashboard"
                activeClassName={classes.active}
                exact
            ><img src={homeIcon} /> Accueil</NavLink>
            <NavLink 
                to='/classes'
                activeClassName={classes.active}
                exact
            ><img src={ressourcesIcon} /> Classes</NavLink>
            <NavLink 
                to='/ressources'
                activeClassName={classes.active}
                exact
            ><img src={classesIcon} /> Ressources</NavLink>
            <NavLink 
                to='/tasks'
                activeClassName={classes.active}
                exact
            ><img src={tasksIcon} /> Taches</NavLink>
            <NavLink 
                to='/discussions'
                activeClassName={classes.active}
                exact
            ><img src={discussionIcon} /> Discussions</NavLink>
        </div>
    )
}

export default LeftBar;
