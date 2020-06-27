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
import Logo from '../../../assets/images/logo-alone.svg';


const LeftBar = (props) => {
    return (
        <div className={classes.LeftBar} style = {localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'}: null}>
            <div className={classes.Logo} style = {localStorage.getItem('theme') === 'dark' ? {color : 'white', borderBottom: '1px solid #312C40', borderRight: '1px solid #312C40'} : null}>
                <img src={Logo} height="40px"/><span><li>andro</li>meda</span>
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
            
            {props.user.role === 'Admin' ? <NavLink 
                to='/admin'
                activeClassName={classes.active}
                exact
            >Admin Panel</NavLink> : null}

            <div className={classes.Logout}>
                <NavLink to="/auth/logout" exact style = {localStorage.getItem('theme') === 'dark' ? {backgroundColor : '#3459D6', borderBottom: '1px solid #312C40', borderRight: '1px solid #312C40'} : null}>Deconnexion</NavLink>
            </div>
        </div>
    )
}

export default withRouter(LeftBar);
