import React, { Component } from 'react';
import classes from './Admin.module.css';
import { connect } from 'react-redux';
import * as timeago from 'timeago.js';
import { motion } from 'framer-motion';
import * as adminActions from '../../store/actions/index';

class Admin extends Component {

    state = {
        currentCategory: 'Professors'
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

    render() {
        let content = null;
        if (this.state.currentCategory === 'Professors') {
            let professors = null;

            if (this.props.users) {
                professors = this.props.users.map((user,id) => {
                    if (user.role === 'Professor') {
                        return <tr key={user.id} style={{fontWeight:'400', fontSize:'14px'}}>
                            <td><img style={{borderRadius: '50%'}} src={user.image ? user.image : 'http://localhost:3000/profile-placeholder.jpg'} width='40px' height='40px'/></td>
                            <td style={{color:'#181818',fontWeight:'600', fontSize:'14px'}}>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td><button onClick={() => {this.onEditTaskHandler(id)}}>Voir</button></td>
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
                            <td><img style={{borderRadius: '50%'}} src={user.image ? user.image : 'http://localhost:3000/profile-placeholder.jpg'} width='40px' height='40px'/></td>
                            <td style={{color:'#181818',fontWeight:'600', fontSize:'14px'}}>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td><button onClick={() => {this.onEditTaskHandler(id)}}>Voir</button></td>
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
                        <td><img style={{borderRadius: '50%'}} src={course.image} width='40px' height='40px'/></td>
                        <td style={{color:'#181818',fontWeight:'600', fontSize:'14px'}}>{course.name}</td>
                        <td>Salim Regragui</td>
                        <td>{course.valide === 1 ? 'Validé' : 'Non Validé'}</td>
                        <td>{course.rating} / 5</td>
                        <td><button onClick={() => {this.onEditTaskHandler(id)}}>Voir</button></td>
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
        onGetUsers: () => dispatch(adminActions.usersAllAdmin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
