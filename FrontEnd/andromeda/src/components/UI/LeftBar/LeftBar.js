import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import classes from './LeftBar.module.css';
import homeIcon from '../../../assets/images/home-icon.svg';
import discussionIcon from '../../../assets/images/discussion-icon.svg';
import tasksIcon from '../../../assets/images/tasks-icon.svg';
import ressourcesIcon from '../../../assets/images/ressources-icon.svg';
import classesIcon from '../../../assets/images/classes-icon.svg';

import homeIconIdle from '../../../assets/images/home-icon-not.svg';
import discussionIconSelect from '../../../assets/images/discussion-icon-select.svg';
import tasksIconSelect from '../../../assets/images/tasks-icon-select.svg';
import ressourcesIconSelect from '../../../assets/images/resources-icon-select.svg';
import classesIconSelect from '../../../assets/images/classes-icon-select.svg';


const LeftBar = (props) => {
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
            ><img src={props.location.pathname === '/dashboard' ? homeIcon : homeIconIdle} alt="home"/> Accueil</NavLink>
            <NavLink 
                to='/classes'
                activeClassName={classes.active}
                exact
            ><img src={props.location.pathname === '/classes' ? classesIconSelect : ressourcesIcon} alt="ressources"/> Classes</NavLink>
            <NavLink 
                to='/ressources'
                activeClassName={classes.active}
                exact
            ><img src={props.location.pathname === '/ressources' ? ressourcesIconSelect : classesIcon} alt="classes"/> Ressources</NavLink>
            <NavLink 
                to='/tasks'
                activeClassName={classes.active}
                exact
            ><img src={props.location.pathname === '/tasks' ? tasksIconSelect : tasksIcon} alt="tasks"/> Taches</NavLink>
            <NavLink 
                to='/discussions'
                activeClassName={classes.active}
                exact
            ><img src={props.location.pathname === '/discussions' ? discussionIconSelect : discussionIcon} alt="discussion"/> Discussions</NavLink>
            
            <div className={classes.Logout}>
                <NavLink to="/auth/logout" exact>Deconnexion</NavLink>
            </div>
        </div>
    )
}

export default withRouter(LeftBar);
