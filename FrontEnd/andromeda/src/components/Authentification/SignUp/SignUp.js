import React from 'react';
import classes from './SignUp.module.css';
import signUpImage from '../../../assets/images/landing-img.png';
import { NavLink } from 'react-router-dom';

const SignUp = (props) => {
    return (
        <div className={classes.SignUp}>
            <img src={signUpImage} alt="signup" />
            <div className={classes.SignUp_Content}>
                <h1><NavLink className={classes.H1_nav} to='/'>Andromeda</NavLink></h1>
                <h2>Bienvenue parmis nous !</h2>
                <label for="email">Adresse Email :</label>
                <input type="text" placeholder="Votre Email" value={props.email} onChange={props.changedEmail} /><br/>
                <br/>
                <label for="pass">Mot de passe :</label>
                <input type="password" placeholder="Votre Mot de passe" value={props.password} onChange={props.changedPass} /><br/>
                <br/>
                <label for="pass">Confirmer Mot de passe :</label>
                <input type="password" placeholder="Confirmer votre Mot de passe" value={props.password} onChange={props.changedPass} /><br/>
                <br/><br/><br/>
                <button>S'inscrire</button>

                <br/><br/><br/>
                <NavLink 
                    to='/auth/signin'
                >Vous avez déja un compte ? <strong>Connectez-vous !</strong></NavLink>
            </div>
        </div>
    )
}

export default SignUp;
