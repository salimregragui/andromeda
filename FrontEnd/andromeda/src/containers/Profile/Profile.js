import React, { Component } from 'react'
import { Switch, Route } from 'react-router';
import ProfileLogged from '../../components/Profile/Profile';
import ProfileUser from '../../components/Profile/ProfileUser/ProfileUser';
import {connect} from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import axios from 'axios';
import {motion, AnimatePresence} from 'framer-motion';
import Modal from '../../components/UI/Modal/Modal';
import classes from './Profile.module.css';

class Profile extends Component {
    state = {
        progressionLoaded: true,
        selectedUser: null,
        showModal: false,
        message : ''
    }
    componentDidMount() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.style.backgroundColor = '#312C40';
        } else {
            document.body.style = 'background: #f1f1f4;';
        }

        if (!this.props.progression) {
            this.setState({progressionLoaded: false});
        } 
    }

    componentDidUpdate() {
        if(this.props.logged && !this.state.progressionLoaded) {
            console.log("get progression !");
            this.props.onGetProgression();
            this.setState({progressionLoaded: true});
        }
    }

    getSelectedUserHandler = (name) => {
        console.log("okay !");
        axios.get('http://localhost:8000/api/auth/user/' + name.split('-').join(' '), this.props.user)
        .then(response => {
            this.setState({selectedUser:response.data.User});  
        })
        .catch(error => {
            console.log(error);
        })
    }

    imageChangedNotification = () => {
        this.props.onAddNotification({
            'type': 'success',
            'content': 'Photo de profile changée avec succès !',
            'seen': false,
            'displayed': false
        });
    }

    startDiscussion = () => {
        axios.get('http://localhost:8000/api/auth/discussion/user/' + this.state.selectedUser.id)
        .then(response => {
            console.log(response);
            if (response.data.discussion_id === null) {
                this.setState({showModal: true})
            } else {
                this.props.onAddNotification({
                    'type': 'error',
                    'content': 'Vous avez déja une discussion en cours avec l\'utilisateur ' + this.state.selectedUser.name + ' !',
                    'seen': false,
                    'displayed': false
                });
            }
        })
        .catch(error => console.log(error));
    }

    pageVariants = {
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

    pageTransition = {
        type: "tween",
        duration: 0.6
    }

    messageChange = (event) => {
        this.setState({message: event.target.value});
    }

    closeModal = () => {
        this.setState({showModal: false});
    }

    sendMessage = () => {
        let message = {
            'discussion_id': null,
            'user_id': this.state.selectedUser.id,
            'text': this.state.message
        }

        axios.post('http://localhost:8000/api/auth/message/send/groupe', message)
        .then(response => {
            console.log(response);
            this.setState({showModal: false, message: ''});

            this.props.onAddNotification({
                'type': 'success',
                'content': 'Message envoyé à ' + this.state.selectedUser.name + ' avec succès !',
                'seen': false,
                'displayed': false
            });
        })
        .catch(error => {
            console.log(error => {
                this.props.onAddNotification({
                    'type': 'error',
                    'content': 'Une erreur est survenue lors de l\'envoie du message à ' + this.state.selectedUser.name,
                    'seen': false,
                    'displayed': false
                });
            });
        })
    }

    render() {
        let routes = null;
        let modal = null;

        if (this.props.user) {
            routes = <Switch>
                <Route path="/profile/" exact render={() => <ProfileLogged user={this.props.user} progression={this.props.progression} onImageChange ={(token, user) => {this.props.onGetUser(token, user)}} onImageChangedNotification = {this.imageChangedNotification}/>} />
                <Route path="/profile/:userName" render={() =><ProfileUser discussionStart = {this.startDiscussion} user={this.state.selectedUser} getUser={(name) => {this.getSelectedUserHandler(name)}} />} />
            </Switch>
        }

        if (this.state.showModal) {
            modal = <Modal width="40" height="200px">
                <div className={classes.newMessage}>
                    <h1>Quel sera votre premier Message pour {this.state.selectedUser.name} ?</h1>
                    <input type="text" value={this.state.message} placeholder="Message a envoyer" onChange={(event) => {this.messageChange(event)}} />
                    <div className={classes.newMessageButtons}>
                        <button onClick={this.sendMessage}>Envoyer</button>
                        <button style={{backgroundColor:'#181818'}} onClick={this.closeModal}>Fermer</button>
                    </div>
                </div>
            </Modal>
        }
        return (
            <React.Fragment>
                <AnimatePresence>
                    {modal}
                </AnimatePresence>
                <motion.div initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition}>
                    {routes}
                </motion.div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        progression: state.courses.progression
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProgression: () => dispatch(coursesActions.coursesProgression()),
        onGetUser: (token, user) => dispatch(coursesActions.authSuccess(token, user)),
        onAddNotification: (notif) => dispatch(coursesActions.addNotification(notif))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
