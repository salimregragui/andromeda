import React, { Component } from 'react';
import classes from './Tasks.module.css';
import { connect } from 'react-redux';
import * as tasksActions from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import * as timeago from 'timeago.js';
import { AnimatePresence, motion } from 'framer-motion';

class Tasks extends Component {

    state = {
        tasksLoaded: true,
        tasksToRender : null,
        modal: false,
        modalType: 'newTask',
        newTask: {
            content: '',
            status: 'a faire',
            type: 'important'
        },
        selectedTask: {
            content: '',
            status: '',
            type: ''
        },
        currentCategory: 'All',
        totalAll: 0,
        totalFinished: 0,
        totalToBeDone: 0,
        totalToDo: 0
    }

    componentDidMount() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.style.backgroundColor = '#2C2839';
        } else {
            document.body.style = 'background: white;';
        }

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

        if (!this.props.tasks) {
            this.setState({tasksLoaded: false});
        }else {
            this.setState({tasksToRender: this.props.tasks})
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.logged && !this.state.tasksLoaded && !this.props.tasks) {
            console.log("get tasks !");
            this.props.onGetTasks();
            this.setState({tasksLoaded: true});
        }

        if (this.props.tasks && this.state.currentCategory === 'All' && (this.state.tasksToRender === null || this.state.tasksToRender !== this.props.tasks)) {
            this.setState({tasksToRender: this.props.tasks, totalAll: this.props.tasks.length});
        }

        if (this.props.tasks && (this.state.totalAll === 0 || prevState.totalAll < this.state.totalAll)) {
            if (this.props.tasks.length >= 1) {
                let newTasks = null;
                
                newTasks = [...this.props.tasks];
                this.setState({totalAll: newTasks.length});
                
                newTasks = this.props.tasks.filter(task => {
                    return task.status === 'fini'
                });
                this.setState({totalFinished: newTasks.length});
                
                newTasks = this.props.tasks.filter(task => {
                    return task.status === 'en cours'
                });
                this.setState({totalToBeDone: newTasks.length});
                
                newTasks = this.props.tasks.filter(task => {
                    return task.status === 'a faire'
                });
                this.setState({totalToDo: newTasks.length});
            }
        }
    }

    onNewTaskHandler = () => {
        this.setState({modal: true, modalType: 'newTask'});
        console.log("New task modal");
    }

    onEditTaskHandler = (id) => {
        let selectedTask = {
            id: this.state.tasksToRender[id].id,
            content: this.state.tasksToRender[id].content,
            status: this.state.tasksToRender[id].status,
            type: this.state.tasksToRender[id].type
        }

        this.setState({modal: true, modalType:'editTask', selectedTask: selectedTask});
    }

    changedNewTaskHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const changedNewtask = {...this.state.newTask}
        changedNewtask[name] = value;

        this.setState({newTask: changedNewtask})
    }

    changedEditTaskHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const changedSelectedTask = {...this.state.selectedTask}
        changedSelectedTask[name] = value;

        this.setState({selectedTask: changedSelectedTask})
    }

    onNewTaskSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state.newTask);
        this.setState({modal: false});
        this.props.onGetTasks();
    }

    onEditTaskSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onEditTask(this.state.selectedTask);
        this.setState({modal: false, selectedTask: null});
        this.props.onGetTasks();
    }

    onDeleteTaskHandler = () => {
        let task = this.state.selectedTask;
        this.props.onDeleteTask(task);

        this.setState({modal: false, selectedTask: null});
        this.props.onGetTasks();
    }

    categoriesHandler = (name) => {
        let categories = document.getElementsByClassName(classes.TasksChoice);

        Array.prototype.forEach.call(categories, category => {
            if (localStorage.getItem('theme') === 'dark') {
                category.style.backgroundColor = '#312C40';
                category.style.color = 'white';
            } else {
                category.style.backgroundColor = '#f1f1f4'
            }
        });
        
        if (localStorage.getItem('theme') === 'dark') {
            document.getElementById(name).style.backgroundColor = '#2C2839';
            document.getElementById(name).style.color = 'white';
        }
        else {
            document.getElementById(name).style.backgroundColor = 'white';
        }
        
        if (name !== this.state.currentCategory) {
            this.setState({currentCategory: name});
            this.getTasksToRender(name);
        }
    }

    getTasksToRender = (category) => {
        let newTasks = null;
        
        if (this.props.tasks) {
            if (category === 'All') {
                this.setState({tasksToRender: this.props.tasks});
            }
            else if (category === 'Done') {
                newTasks = this.props.tasks.filter(task => {
                    return task.status === 'fini'
                });
                this.setState({tasksToRender: newTasks, totalFinished: newTasks.length});

            }
            else if (category === 'InProgress') {
                newTasks = this.props.tasks.filter(task => {
                    return task.status === 'en cours'
                });
                this.setState({tasksToRender: newTasks, totalToBeDone: newTasks.length});
            }
            else if (category === 'ToBeDone') {
                newTasks = this.props.tasks.filter(task => {
                    return task.status === 'a faire'
                });
                this.setState({tasksToRender: newTasks, totalToDo: newTasks.length});
            }
        }
    }

    closeModal = () => {
        this.setState({modal:false})
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

    darkThemeForeground = {
        backgroundColor: '#312C40',
        color: 'white'
    }

    darkThemeBackground = {
        backgroundColor: '#2C2839',
        width: '72%'
    }

    render() {
        let tasks = null;
        let modal = null;

        if (this.state.tasksToRender) {
            tasks = this.state.tasksToRender.map((task, id) => {
                return (
                    <tr key={task.id} style={{fontWeight:'400', fontSize:'12px'}}>
                        <td style={{color:localStorage.getItem('theme') === 'dark' ? 'white' : '#181818',fontWeight:'600', fontSize:'14px'}}>{task.content.substring(0, 45)} {task.content.length > 45 ? '...' : null}</td>
                        <td>{task.type}</td>
                        <td>{timeago.format(task.created_at)}</td>
                        <td>{timeago.format(task.updated_at)}</td>
                        <td><button style={{backgroundColor:localStorage.getItem('theme') === 'dark' ? '#2C2839' : null}} onClick={() => {this.onEditTaskHandler(id)}}>Edit</button></td>
                    </tr>
                );
            });
        }

        if (this.state.modal) {
            if(this.state.modalType === 'newTask') {
                modal = <Modal width='40' height='230px'>
                    <div className={classes.newTask} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                        <br/>
                        <h1 className={classes.newTaskTitle}>Nouvelle tache</h1>
                        <form onSubmit={(event) => {this.onNewTaskSubmitHandler(event)}}>
                            <input placeholder="Contenu de la tache" type="text" name="content" value={this.state.newTask.content} onChange={(event) => {this.changedNewTaskHandler(event)}}/><br/>
                            <select name='type' value={this.state.newTask.type} onChange={(event) => {this.changedNewTaskHandler(event)}}>
                                <option value="important">important</option>
                                <option value="moyen">moyen</option>
                                <option value="basique">basique</option>
                            </select>
                            
                            <br/>
                            <button type="button" style={{backgroundColor: '#181818'}} onClick={this.closeModal}>Fermer</button>
                            <button type="submit">Ajouter la tache</button>
                        </form>
                    </div>
                </Modal>
            }
            else if(this.state.modalType === 'editTask') {
                modal = <Modal width='40' height='270px'>
                    <div className={classes.newTask}>
                        <br/>
                        <h1 className={classes.newTaskTitle}>Nouvelle tache</h1>
                        <form onSubmit={(event) => {this.onEditTaskSubmitHandler(event)}}>
                            <input placeholder="Contenu de la tache" type="text" name="content" value={this.state.selectedTask.content} onChange={(event) => {this.changedEditTaskHandler(event)}}/><br/>
                            <select name='type' value={this.state.selectedTask.type} onChange={(event) => {this.changedEditTaskHandler(event)}}>
                                <option value="important">important</option>
                                <option value="moyen">moyen</option>
                                <option value="basique">basique</option>
                            </select>
                            <select name='status' value={this.state.selectedTask.status} onChange={(event) => {this.changedEditTaskHandler(event)}}>
                                <option value="a faire">a faire</option>
                                <option value="en cours">en cours</option>
                                <option value="fini">fini</option>
                            </select>
                            
                            <br/>
                            <button type="button" style={{backgroundColor: '#181818'}} onClick={this.closeModal}>Fermer</button>
                            <button type="button" style={{backgroundColor: '#e74c3c'}} onClick={this.onDeleteTaskHandler}>Supprimer la tache</button>
                            <button type="submit">Editer la tache</button>
                        </form>
                    </div>
                </Modal>
            }
        }

        return (
            <motion.div id="main" initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition} className={classes.Tasks}>
                <AnimatePresence>
                    {modal}
                </AnimatePresence>
                <div className={classes.TasksChoices} style={localStorage.getItem('theme') === 'dark' ? this.darkThemeForeground : null}>
                    <h1>Taches</h1>

                    <button id='All' onClick={() => {this.categoriesHandler('All')}} className={classes.TasksChoice}  style={{ backgroundColor : localStorage.getItem('theme') === 'dark' ? '#2C2839' :'white', color: localStorage.getItem('theme') === 'dark' ? 'white' : null}}>
                        {this.state.totalAll}<br/>
                        <span>Toutes les taches</span>
                    </button>
                    <button id='Done' onClick={() => {this.categoriesHandler('Done')}} className={classes.TasksChoice} style={{ backgroundColor : localStorage.getItem('theme') === 'dark' ? '#312C40' :'#f1f1f4', color: localStorage.getItem('theme') === 'dark' ? 'white' : '#181818'}}>
                        {this.state.totalFinished}<br/>
                        <span>Taches finies</span>
                    </button>
                    <button id='InProgress' onClick={() => {this.categoriesHandler('InProgress')}} className={classes.TasksChoice} style={{ backgroundColor : localStorage.getItem('theme') === 'dark' ? '#312C40' :'#f1f1f4', color: localStorage.getItem('theme') === 'dark' ? 'white' : '#181818'}}>
                        {this.state.totalToBeDone}<br/>
                        <span>Taches en cours</span>
                    </button>
                    <button id='ToBeDone' onClick={() => {this.categoriesHandler('ToBeDone')}} className={classes.TasksChoice} style={{ backgroundColor : localStorage.getItem('theme') === 'dark' ? '#312C40' :'#f1f1f4', color: localStorage.getItem('theme') === 'dark' ? 'white' : '#181818'}}>
                        {this.state.totalToDo}<br/>
                        <span>Taches a faire</span>
                    </button>
                    <button className={classes.TasksNew} onClick={this.onNewTaskHandler}>Ajouter Tache</button>
                    <br/><br/><br/>
                </div>

                <div className={classes.TasksBody} style={localStorage.getItem('theme') === 'dark' ? this.darkThemeBackground : null}>
                    <table>
                        <tbody>
                            <tr style={{color:localStorage.getItem('theme') === 'dark' ? '#f1f1f4' : '#5d5d5d'}}>
                                <td>Tache</td>
                                <td>Type</td>
                                <td>Date</td>
                                <td>Der. Modif.</td>
                                <td></td>
                            </tr>
                            {tasks}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        tasks: state.data.tasks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetTasks: () => dispatch(tasksActions.tasksAll()),
        onAddTask: (task) => dispatch(tasksActions.taskAdd(task)),
        onEditTask: (task) => dispatch(tasksActions.taskEdit(task)),
        onDeleteTask: (task) => dispatch(tasksActions.taskDelete(task))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
