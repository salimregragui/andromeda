import React, { useRef } from 'react';
import classes from './Landing.module.css';
import landingImage from '../../assets/images/landing-img.png';
import InterfaceImage from '../../assets/images/Tasks.jpg';
import Resources from '../../assets/images/Ressources.jpg';
import Ziyad from '../../assets/images/ziyad.png';
import Salim from '../../assets/images/salim.png';
import Course from '../../assets/images/Course.png';
import {motion} from 'framer-motion';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

const Landing = () => {
    document.body.style.backgroundColor = '#ffffff';
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

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
        <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <div className={classes.LandingTop}>
                <img src={landingImage} alt="Landing" />
                <div className={classes.LandingTop_Text}>
                    <h1>Trouvez les cours qu'il vous faut, pour atteindre vos objectifs.</h1>
                    <p>
                        Avec Andromeda vous avez accès aux meilleurs cours d'internet. Nos professeurs
                        sont reconnus pour leur expérience à la fois dans le domaine professionel que dans
                        le domaine de l'enseignement.
                    </p>
                    <button style={{backgroundColor: '#3459D6', color: 'white'}}>Nous rejoindre</button>
                    <button onClick={executeScroll}>En savoir plus sur nous</button>
                </div>
            </div>

            <div className={classes.promiseRight}>
                <img src={Course} alt="promise 1" />
                <div className={classes.promiseRight_Text}>
                    <span>On vous promet</span>
                    <h1>Des cours de qualité</h1>
                    <p>
                        Sur Andromeda nos cours sont analysés de A-Z afin de vérifier le niveau
                        de difficulté et la compréhension du cours choisis.
                    </p>
                </div>
            </div>

            <div className={classes.promiseLeft}>
                <img src={Resources} alt="promise 2" />
                <div className={classes.promiseLeft_Text}>
                    <span>On vous promet</span>
                    <h1>Des tests réguliers</h1>
                    <p>
                        A la fin de chaque section ou unité d'un cours vous aurez accès à un panel
                        d'exercices pour tester votre niveau de compréhension.
                    </p>
                </div>
            </div>

            <div className={classes.promiseRight}>
                <img src={InterfaceImage} alt="promise 3" />
                <div className={classes.promiseRight_Text}>
                    <span>On vous promet</span>
                    <h1>Une interface intuitive</h1>
                    <p>
                        Notre plateforme a été développée avec l'experience utilisateur en tête
                        ce qui vous garantie une navigation fluide et simple à travers les différents
                        modules du site.
                    </p>
                </div>
            </div>

            <div className={classes.about} ref={myRef}>
                <div className={classes.aboutText}>
                    <h2>A propos de nous</h2>

                    <p>Andromeda est une application web développée par deux jeunes étudiants en troisième année
                        d'ingénierie informatique. Ziyad Loubaris responsable du BackEnd de l'application, des
                        informations sur la base de donnée et de la gestion des fichiers sur le serveur
                        et Salim Regragui responsable du web design, du FrontEnd et du système d'authentification 
                        en BackEnd.
                    </p>

                    <p style={{fontWeight:'600',paddingTop:'20px'}}>Les technologies utilisées pour développer Andromeda sont les suivantes :
                        <ul>
                            <li>Pour le BackEnd : Une api Restful avec le framework php Laravel en version 7.0
                                ainsi que Laravel cashier pour la gestion des abonnements et jwt pour l'authentification
                                sécurisée des utilisateurs.
                            </li><br/><br/>
                            <li>
                                Pour le FrontEnd : ReactJs est utilisé dans sa dernière version, avec l'utilisation de 
                                react-router pour créer un effet single page application, ainsi que Redux pour la gestion
                                optimisée du state de l'application et pour finir axios pour envoyer des requetes http à
                                l'api Laravel.
                            </li>
                        </ul>
                    </p>
                </div>

                <div className={classes.aboutImages}>
                    Salim Regragui<br/>
                    <img src={Salim} />
                    <br/>
                    Ziyad Loubaris<br/>
                    <img src={Ziyad} />

                    <br/><br/><br/>
                </div>

                <div className={classes.aboutCopyright}>
                    Copyright 2020. All right reserved to Andromeda and it's creators. All copy of ours
                    courses will result in an infringement of our terms.
                </div>
            </div>
        </motion.div>
    )
}

export default Landing;
