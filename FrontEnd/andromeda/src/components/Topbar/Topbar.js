import React, {useState, useEffect} from 'react';
import classes from './Topbar.module.css';
import SearchBar from '../../containers/SearchBar/SearchBar';
import Notifications from '../../containers/Notifications/Notifications';
import { withRouter } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import {connect} from 'react-redux';
import * as NotificationActions from '../../store/actions/index';

const Topbar = (props) => {
    const [sliderStyle, setSliderStyle] = useState(0);
    
    useEffect(() => {
        setSliderStyle(localStorage.getItem('theme') === 'dark' ? classes.sliderDark : classes.slider);
      }, []);

    let goToProfile = () => {
        props.history.push('/profile');
    }

    let toggleTheme = () => {
        if (localStorage.getItem('theme') === 'light') {
            localStorage.setItem('theme', 'dark');

            props.onAddNotification({
                'type':'success',
                'content':'Theme sombre activé avec succès il sera visible au prochain changement de page !',
                'seen': false,
                'displayed': false
            });
        }else {
            localStorage.setItem('theme', 'light');

            props.onAddNotification({
                'type':'success',
                'content':'Theme clair activé avec succès il sera visible au prochain changement de page !',
                'seen': false,
                'displayed': false
            });
        }
    }

    let image = <div className={classes.ProfileImg} style={{backgroundImage: "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
    let navigation = <NavigationItems />;

    if (props.user) {
        if (props.user.image) {
            image = <div className={classes.ProfileImg} style={{backgroundImage: "url('http://localhost:8000/storage/images/" + props.user.image + "')"}}></div>
        }
    }

    if (localStorage.getItem('token')) {
        navigation = <div className={classes.Profile} onClick={goToProfile} style = {localStorage.getItem('theme') === 'dark' ? {color: 'white'} : null}>
            <span>{JSON.parse(localStorage.getItem('user')).name}</span>
            {image}
        </div>
    }
    
    return (
        <header className={classes.Topbar} style = {localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', borderBottom: '1px solid #312C40'} : null}>
            <div className={classes.Logo} style = {localStorage.getItem('theme') === 'dark' ? {color: 'white', borderBottom: '1px solid #312C40'} : null}>
                <span><li>andro</li>meda</span>
            </div>

            <SearchBar />
            <Notifications />
            <label id="switch" className={classes.switch}>
                <input type="checkbox" onChange={toggleTheme} id="slider" />
                <span className={`${sliderStyle} ${classes.round}`}></span>
            </label>
            <nav>
                {navigation}
            </nav>
        </header>
    )
}

let mapDispatchToProps = dispatch => {
    return {
        onAddNotification: (notif) => dispatch(NotificationActions.addNotification(notif))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Topbar));
