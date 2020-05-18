import React from 'react';
import classes from './SignUp.module.css';
import signUpImage from '../../../assets/images/register-img.jpg';
import { NavLink } from 'react-router-dom';

const SignUp = (props) => {
    return (
        <div className={classes.SignUp}>
            <img src={signUpImage} alt="signup" />
            <div className={classes.SignUp_Content}>
                <h1>Andromeda</h1>
                <h2>Bienvenue parmis nous !</h2>
                
                <label>Adresse Email :</label>
                <input type="text" name="email" placeholder="Votre Email" value={props.email} onChange={props.changed} /><br/>
                
                <br/>
                <label>Nom Complet :</label>
                <input type="text" name="username" placeholder="Votre Nom Complet" value={props.username} onChange={props.changed} /><br/>
                
                <br/>
                <label>Mot de passe :</label>
                <input type="password" name="password" placeholder="Votre Mot de passe" value={props.password} onChange={props.changed} /><br/>
                
                <br/>
                <label>Confirmer Mot de passe :</label>
                <input type="password" name="confirmPassword" placeholder="Confirmer votre Mot de passe" value={props.confirmPass} onChange={props.changed} /><br/>
                
                <br/><br/><br/>
                <button onClick={props.submitedSignUp}>S'inscrire</button>

                <br/><br/><br/>
                <NavLink 
                    to='/auth/signin'
                >Vous avez déja un compte ? <strong>Connectez-vous !</strong></NavLink>
                <br/><br/><br/>
            </div>
        </div>
    )
}

export default SignUp;
