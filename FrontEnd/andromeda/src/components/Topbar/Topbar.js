import React from 'react';
import classes from './Topbar.module.css';
// import Logo from '../../assets/images/logo-name.svg';
import SearchBar from '../../containers/SearchBar/SearchBar';
import profilePic from '../../assets/images/profile.jpg';
import { withRouter } from 'react-router-dom';

const Topbar = (props) => {
    let goToProfile = () => {
        props.history.push('/profile');
    }
    return (
        <header className={classes.Topbar}>
            <div className={classes.Logo}>
                <span>Andromeda</span>
            </div>

            <SearchBar />
            
            <nav>
                <div className={classes.Profile} onClick={goToProfile}>
                    <span>Salim Regragui</span>
                    <div className={classes.ProfileImg} style={{backgroundImage: "url(" + profilePic + ")"}}></div>
                </div>
            </nav>
        </header>
    )
}

export default withRouter(Topbar);
