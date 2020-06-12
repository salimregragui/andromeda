import React from 'react';
import classes from './SignUp.module.css';
import signUpImage from '../../../assets/images/register-img.jpg';
import { NavLink } from 'react-router-dom';
import {motion} from 'framer-motion';

const SignUp = (props) => {
    let pageVariants = {
        initial: {
            opacity: 0,
            x: "-100%"
        },
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: "100%"
        }
    }

    let pageTransition = {
        type: "tween",
        duration: 0.6
    }

    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className={classes.SignUp}>
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
        </motion.div>
    )
}

export default SignUp;
