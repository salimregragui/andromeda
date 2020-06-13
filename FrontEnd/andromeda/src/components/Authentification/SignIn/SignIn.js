import React from 'react';
import classes from './SignIn.module.css';
import signInImage from '../../../assets/images/login-img.png';
import { NavLink } from 'react-router-dom';
import {motion} from 'framer-motion';

const SignIn = (props) => {
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
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className={classes.SignIn}>
            <img src={signInImage} alt="signin" />
            <div className={classes.SignIn_Content}>
                <h1>Andromeda</h1>
                <h2>Bon retour parmis nous !</h2>
                <label>Adresse Email :</label><br/>
                <input type="text" name="email" placeholder="Votre Email" value={props.email} onChange={props.changed} /><br/>
                <br/>
                <label>Mot de passe :</label><br/>
                <input type="password" name="password" placeholder="Votre Mot de passe" value={props.password} onChange={props.changed} />
                <br/><br/><br/>
                <button onClick={props.submitedSignIn}>Se connecter</button>
                <br/><br/><br/><br/>
                <NavLink 
                    to='/auth/signup'
                >Vous n'avez pas encore de compte ? <strong>Inscrivez-vous !</strong></NavLink>
            </div>
        </motion.div>
    )
}

export default SignIn;
