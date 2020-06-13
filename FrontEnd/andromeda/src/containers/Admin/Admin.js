import React, { Component } from 'react';
import classes from './Admin.module.css';
import { connect } from 'react-redux';
import * as timeago from 'timeago.js';
import { AnimatePresence, motion } from 'framer-motion';
import * as adminActions from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import axios from 'axios';

class Admin extends Component {

    state = {
        currentCategory: 'Professors',
        selectedUser : null,
        selectedCourse : null,
        showingModal: false
    }

    componentDidMount() {
        document.body.style = 'background: white;';
        if (!localStorage.getItem('token')) {
            this.props.history.push('/auth/signin');
        }

        if (this.props.location.state)
        {
            if (this.props.logged && this.props.location.state.from === '/auth/signin')
            {
                window.location.reload();
            }
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.user) {
            if (this.props.user.role !== 'Admin') {
                this.props.history.push({
                    'pathname' : '/error',
                    state: {
                        error: '401'
                    }
                })
            }
        }

        if (this.state.currentCategory === 'Courses' && !this.props.courses) {
            this.props.onGetCourses();
        }

        if ((this.state.currentCategory === 'Users' || this.state.currentCategory === 'Professors') && !this.props.users) {
            this.props.onGetUsers();
        }
    }

    categoriesHandler = (name) => {
        let categories = document.getElementsByClassName(classes.AdminChoice);

        Array.prototype.forEach.call(categories, category => {
            category.style.backgroundColor = '#f1f1f4'
        });

        document.getElementById(name).style.backgroundColor = '#ffffff';
        
        if (name !== this.state.currentCategory) {
            this.setState({currentCategory: name});
        }
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
        transition: "linear",
        duration: 0.6
    }

    onSeeUserHandler = (userId) => {
        this.setState({selectedUser: this.props.users[userId], showingModal: true});
    }

    onSeeCourseHandler = (courseId) => {
        this.setState({selectedCourse: this.props.courses[courseId], showingModal: true});
    }

    closeModal = () => {
        this.setState({showingModal: false});
    }

    banUser = (userId, username) => {
        axios.post('http://localhost:8000/api/auth/user/' + userId + '/banned')
        .then(response => {
            this.props.onAddNotification({
                'type': 'success',
                'content': 'L\'utilisateur ' + username + ' a été bannis avec succès !',
                'seen': false,
                'displayed': false
            });
            this.props.onGetUsers();
        })
        .catch(error => console.log(error));

        this.setState({selectedUser: null, showingModal: false});
    }

    unbanUser = (userId, username) => {
        axios.post('http://localhost:8000/api/auth/user/' + userId + '/unbanned')
        .then(response => {
            console.log(response);
            this.props.onAddNotification({
                'type': 'success',
                'content': 'L\'utilisateur ' + username + ' a été dé-bannis avec succès !',
                'seen': false,
                'displayed': false
            });
            this.props.onGetUsers();
        })
        .catch(error => console.log(error));

        this.setState({selectedUser: null, showingModal: false});
    }

    render() {
        let content = null;
        let modal = null;

        if (this.state.showingModal) {
            if (this.state.currentCategory === 'Users' || this.state.currentCategory === 'Professors') {
                modal = <Modal width='46' height='400'>
                    <div className={classes.userInfos}>
                        <div className={classes.userInfosImg} style={{backgroundImage: this.state.selectedUser.image ? "url('" + this.state.selectedUser.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                        <div className={classes.userInfosText}>
                            <span>Name : </span> {this.state.selectedUser.name}<br/>
                            <span>Email : </span> {this.state.selectedUser.email}<br/>
                            <span>Role : </span> {this.state.selectedUser.role}<br/>
                            <span>Status : </span> {this.state.selectedUser.status}<br/>
                            <span>Compte Créer : </span> {timeago.format(this.state.selectedUser.created_at)}<br/>
                        </div>

                        <div className={classes.userButtons}>
                            {this.state.selectedUser.status === 'Banned' ? <button onClick={() => {this.unbanUser(this.state.selectedUser.id, this.state.selectedUser.name)}}>Dé-bannir</button> : <button onClick={() => {this.banUser(this.state.selectedUser.id, this.state.selectedUser.name)}}>Bannir</button>}
                            <button style={{backgroundColor: "#181818"}} onClick={this.closeModal}>Fermer</button>
                        </div>
                        <br/><br/><br/>
                    </div>
                </Modal>
            }

            if (this.state.currentCategory === 'Courses') {
                modal = <Modal width='60' height='600'>
                    <div className={classes.userInfos}>
                        <div className={classes.userInfosImg} style={{backgroundImage: this.state.selectedCourse.image ? "url('" + this.state.selectedCourse.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                        <div className={classes.userInfosText}>
                            <span>Name : </span> {this.state.selectedCourse.name}<br/>
                            <span>Professeur : </span> Salim Regragui<br/>
                            <span>Note : </span> {this.state.selectedCourse.rating} / 5<br/>
                            <span>Status : </span> {this.state.selectedCourse.valide === 1 ? 'Validé' : 'Non validé'}<br/>
                            <span>Cours Créer : </span> {timeago.format(this.state.selectedCourse.created_at)}<br/>
                        </div>

                        <div className={classes.userButtons}>

                            <button style={{backgroundColor: "#181818"}} onClick={this.closeModal}>Fermer</button>
                        </div>
                        <br/><br/><br/>
                    </div>
                </Modal>
            }
        }

        if (this.state.currentCategory === 'Professors') {
            let professors = null;

            if (this.props.users) {
                professors = this.props.users.map((user,id) => {
                    if (user.role === 'Professor') {
                        return <tr key={user.id} style={{fontWeight:'400', fontSize:'14px'}}>
                            <td><img alt="a" style={{borderRadius: '50%'}} src={user.image ? user.image : 'http://localhost:3000/profile-placeholder.jpg'} width='40px' height='40px'/></td>
                            <td style={{color:'#181818',fontWeight:'600', fontSize:'14px'}}>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td><button onClick={() => {this.onSeeUserHandler(id)}}>Voir</button></td>
                        </tr>
                    }
                    else {
                        return null;
                    }
                })
            }
            content = <table>
                <tbody>
                    <tr style={{color:'#5d5d5d'}}>
                        <td>Image</td>
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                    {professors}
                </tbody>
            </table>
        }

        if (this.state.currentCategory === 'Users') {
            let users = null;

            if (this.props.users) {
                users = this.props.users.map((user,id) => {
                    if (user.role === 'Student') {
                        return <tr key={user.id} style={{fontWeight:'400', fontSize:'14px'}}>
                            <td><img alt="a" style={{borderRadius: '50%'}} src={user.image ? user.image : 'http://localhost:3000/profile-placeholder.jpg'} width='40px' height='40px'/></td>
                            <td style={{color:'#181818',fontWeight:'600', fontSize:'14px'}}>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td><button onClick={() => {this.onSeeUserHandler(id)}}>Voir</button></td>
                        </tr>
                    }
                    else {
                        return null;
                    }
                })
            }

            content = <table>
                <tbody>
                    <tr style={{color:'#5d5d5d'}}>
                        <td>Image</td>
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                    {users}
                </tbody>
            </table>
        }

        if (this.state.currentCategory === 'Courses') {
            let courses = null;
            if (this.props.courses) {
                courses = this.props.courses.map((course,id) => {
                    return <tr key={course.id} style={{fontWeight:'400', fontSize:'14px'}}>
                        <td><img alt="a" style={{borderRadius: '50%'}} src={course.image} width='40px' height='40px'/></td>
                        <td style={{color:'#181818',fontWeight:'600', fontSize:'14px'}}>{course.name}</td>
                        <td>Salim Regragui</td>
                        <td>{course.valide === 1 ? 'Validé' : 'Non Validé'}</td>
                        <td>{course.rating} / 5</td>
                        <td><button onClick={() => {this.onSeeCourseHandler(id)}}>Voir</button></td>
                    </tr>
                })
            }
            content = <table>
                <tbody>
                    <tr style={{color:'#5d5d5d'}}>
                        <td>Image</td>
                        <td>Nom</td>
                        <td>Professeur</td>
                        <td>Status</td>
                        <td>Note</td>
                        <td></td>
                    </tr>
                    {courses}
                </tbody>
            </table>
        }
        return (
            <motion.div id="main" initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition} className={classes.Admin}>
                <AnimatePresence>
                    {modal}
                </AnimatePresence>
                <div className={classes.AdminChoices}>
                    <h1>Admin</h1>

                    <button id='Professors' onClick={() => {this.categoriesHandler('Professors')}} className={classes.AdminChoice}  style={{backgroundColor:'white'}}>
                        Professeurs<br/>
                        <span>Gerer</span>
                    </button>
                    <button id='Users' onClick={() => {this.categoriesHandler('Users')}} className={classes.AdminChoice}>
                        Utilisateurs<br/>
                        <span>Gerer</span>
                    </button>
                    <button id='Courses' onClick={() => {this.categoriesHandler('Courses')}} className={classes.AdminChoice}>
                        Cours<br/>
                        <span>Gerer</span>
                    </button>
                    <br/><br/>
                </div>

                <div className={classes.AdminBody}>
                    {content}
                </div>
            </motion.div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        courses: state.admin.courses,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCourses: () => dispatch(adminActions.coursesAllAdmin()),
        onGetUsers: () => dispatch(adminActions.usersAllAdmin()),
        onAddNotification: (notif) => dispatch(adminActions.addNotification(notif))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
