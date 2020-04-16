import React from 'react';
import classes from './Landing.module.css';
import landingImage from '../../assets/images/landing-img.png';

const Landing = () => {
    return (
        <React.Fragment>
            <div className={classes.LandingTop}>
                <img src={landingImage} alt="Landing Image" />
                <div className={classes.LandingTop_Text}>
                    <h1>Trouvez les cours qu'il vous faut, pour atteindre vos objectifs.</h1>
                    <p>
                        Avec Andromeda vous avez accès aux meilleurs cours d'internet. Nos professeurs
                        sont reconnus pour leur expérience à la fois dans le domaine professionel que dans
                        le domaine de l'enseignement.
                    </p>
                    <button style={{backgroundColor: '#3459D6', color: 'white'}}>Nous rejoindre</button>
                    <button>En savoir plus sur nous</button>
                </div>
            </div>

            <div className={classes.promiseRight}>
                <img src={landingImage} alt="Landing Image" />
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
                <img src={landingImage} alt="Landing Image" />
                <div className={classes.promiseLeft_Text}>
                    <span>On vous promet</span>
                    <h1>Des cours de qualité</h1>
                    <p>
                        Sur Andromeda nos cours sont analysés de A-Z afin de vérifier le niveau
                        de difficulté et la compréhension du cours choisis.
                    </p>
                </div>
            </div>

            <div className={classes.promiseRight}>
                <img src={landingImage} alt="Landing Image" />
                <div className={classes.promiseRight_Text}>
                    <span>On vous promet</span>
                    <h1>Des cours de qualité</h1>
                    <p>
                        Sur Andromeda nos cours sont analysés de A-Z afin de vérifier le niveau
                        de difficulté et la compréhension du cours choisis.
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Landing;
