import React from 'react';
import classes from './SignIn.module.css';
import signInImage from '../../../assets/images/landing-img.png';
import { NavLink } from 'react-router-dom';

const SignIn = (props) => {
    return (
        <div className={classes.SignIn}>
            <img src={signInImage} alt="signin" />
            <div className={classes.SignIn_Content}>
                <h1>Andromeda</h1>
                <h2>Bon retour parmis nous !</h2>
                <label for="email">Adresse Email :</label><br/>
                <input type="text" placeholder="Votre Email" value={props.email} onChange={props.changedEmail} /><br/>
                <br/>
                <label for="pass">Mot de passe :</label><br/>
                <input type="password" placeholder="Votre Mot de passe" value={props.password} onChange={props.changedPass} />
                <br/><br/><br/>
                <button>Se connecter</button>
                <br/><br/><br/><br/>
                <NavLink 
                    to='/auth/signup'
                >Vous n'avez pas encore de compte ? <strong>Inscrivez-vous !</strong></NavLink>
            </div>
        </div>
    )
}

export default SignIn;
