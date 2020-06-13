import React from 'react';
import classes from './Error.module.css';
import errorImage from '../../assets/images/error.png';
import {motion} from 'framer-motion';

function getErrorCode(message) {
    let n = message.trim().split(" ");
    return n[n.length - 1];

}

const Error = (props) => {
    document.body.style.backgroundColor = "#ffffff";
    let error = {
        number: 69,
        message: "Oh comme c'est gentil de votre part de visiter cette page alors qu'il ny'a pas d'erreur !"
    };

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

    if (props.location.state)
    {
        error.number = getErrorCode(props.location.state.error.message);

        if (error.number === "401") {
            error.message = <React.Fragment>
                                Oh nous somme désolé,<br/>
                                Vous n'avez pas l'autorisation pour effectuer la requête demandée.
                            </React.Fragment>
        }
        else if (error.number === "404") {
            error.message = <React.Fragment>
                                Oh nous somme désolé,<br/>
                                La page ou la requête que vous voulez atteindre n'existe pas :(
                            </React.Fragment>
        }
        else if (error.number === "500") {
            error.message = <React.Fragment>
                                Oh nous somme désolé,<br/>
                                Il semblerait qu'il y ai une erreur serveur. Réactualisez la page
                                et si le problème persiste contactez un administrateur.
                            </React.Fragment>
        }
    }
    return (
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <div className={classes.Error}>
                <img className={classes.ErrorImg} src={errorImage} alt="error" />
                <div className={classes.ErrorData}>
                   <h1>{error.number}</h1>
                   <span>{error.message}</span> 
                </div>
            </div>
        </motion.div>
    )
}

export default Error;
