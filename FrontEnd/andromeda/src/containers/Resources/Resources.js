import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import classes from './Resources.module.css';
import Modal from '../../components/UI/Modal/Modal';
import * as timeago from 'timeago.js';
import {motion} from 'framer-motion';

class Resources extends Component {
    state = {
        loading: false,
        resourcesLoaded: true,
        dataEntered: false,
        displayedResources: [],
        showModal: false,
        resourcesToDisplay: [],
        displayedResource: {
            path: '',
            type: '',
        },
        searchBar: ''
    }

    componentDidMount() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.style.backgroundColor = '#312C40';
        } else {
            document.body.style = 'background: #f1f1f4;';
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

        if (!this.props.resources) {
            this.setState({resourcesLoaded: false, loading: true});
        }

        if (this.props.resources && !this.state.dataEntered) {
            console.log("yeaah");
            this.setState({resourcesLoaded: false, loading: true});
        }
    }

    componentDidUpdate() {
        if (this.props.logged && !this.state.resourcesLoaded) {
            console.log("get resources !");
            this.props.onGetResources();
            this.setState({resourcesLoaded: true});
        }

        if (this.props.resources && !this.state.dataEntered) {
            let displayedResources = [...this.state.displayedResources];
            let resourcesToDisplay = [...this.props.resources];
            resourcesToDisplay = resourcesToDisplay.filter(res => {
                return res.Resources.length > 0
            });

            for (let i = 0; i < this.props.resources.length; i++) {
                displayedResources[i] = true;
            }

            this.setState({dataEntered: true, displayedResources: displayedResources, resourcesToDisplay: resourcesToDisplay, loading: false});
        }
    }

    displayedResourcesHandler = (id) => {
        let displayedResources = [...this.state.displayedResources];
        displayedResources[id] = !displayedResources[id];

        this.setState({displayedResources: displayedResources});
    }

    resourceDisplayHandler = (res) => {
        let resource = {
            path: 'http://localhost:8000' + res.attachment,
            type: res.type
        }

        console.log(resource);
        this.setState({displayedResource: resource, showModal: true});
    }

    closeModalHandler = () => {
        this.setState({showModal: false});
    }

    changeSearchHandler = (event) => {
        this.setState({searchBar: event.target.value});

        this.searchClickHandler(event.target.value);
    }

    searchClickHandler = (val) => {
        if (this.props.resources) {
            let newResources = Array.from(this.props.resources);

            newResources = newResources.filter(res => {
                return res.Resources.length > 0
            });
        
            if (val) {   
                newResources = newResources.filter(resource => {
                    return resource.Resources.some(res => {
                        return res.name.toLowerCase().includes(val.toLowerCase());
                    })
                })
            }
    
            this.setState({resourcesToDisplay: newResources});
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
        duration: 0.4
    }

    render() {
        let spinner = null;
        let resources = null;
        let modal = null;

        if (this.state.loading) {
            spinner = <Spinner />
        }

        if (this.state.resourcesToDisplay && this.state.displayedResources.length >= 1) {
            resources = this.state.resourcesToDisplay.length >= 1 ? this.state.resourcesToDisplay.map((resource, id) => {
                return <React.Fragment key={resource.id}>
                    <div className={classes.CourseName} onClick={() => {this.displayedResourcesHandler(id)}} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null}>
                        Cours : {resource.name}
                    </div>

                    <div className={`${classes.ResourcesCourse} ${!this.state.displayedResources[id] ? classes.hiddenInfos : null}`}>
                        {resource.Resources.map((res, id) => {
                            if (res.name.toLowerCase().includes(this.state.searchBar.toLowerCase())) {
                                let shownName = res.name;
                                let splitName = null;
                                let searched = null;
                                if (this.state.searchBar) {
                                    shownName = shownName.replace(this.state.searchBar, '|||' + this.state.searchBar + '|||');
                                    splitName = shownName.split('|||');
                                    searched = splitName[1];
                                }
                                return <div key={res.id} className={classes.ResourceCourse} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null}>
                                    <div className={classes.ResourceCourseInfo}>
                                        <span>{res.type}</span>
                                        <li>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</li>
                                    </div>
                                    <div className={classes.ResourceCourseAddInfo}>
                                        <span>{timeago.format(res.created_at)}</span>
                                        <button style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white', border:'2px solid white'} : null} onClick={() => {this.resourceDisplayHandler(res)}}>Voir</button>
                                    </div>
                                </div>
                            }
                            else {
                                return null;
                            }
                        })}
                    </div>
                </React.Fragment>
            }) : <div style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null} className={classes.CourseName}>Aucune ressource ne contient le terme cherché</div>;
        }else {
            resources = <div style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null} className={classes.CourseName}>Les cours que vous suivez ne contiennent aucune ressource.</div>;
        }

        if (this.state.showModal) {
            modal = <Modal width='80' height='500px' fullscreen>
                 <button className={classes.CloseModal} onClick={this.closeModalHandler}>Fermer</button>
                 <iframe title="Content" className={this.state.displayedResource.type} width="100%" height="97%"
                 frameborder="0" src={this.state.displayedResource.path}></iframe>
            </Modal>
        }

        return (
            <motion.div initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition} className={classes.Resources}>
                {spinner}
                {modal}
                <br/>
                <div className={classes.leftResources} style={localStorage.getItem('theme') === 'dark' ? {color: 'white'} : null}>
                    <h1>Toutes vos ressources</h1>
                    {resources} 
                </div>

                <div className={classes.rightResources}>
                    <input style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null} type="text" value={this.state.searchBar} placeholder="Cherchez une ressource par nom" onChange={(event) => {this.changeSearchHandler(event)}} />
                </div>
            </motion.div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        resources: state.data.resources
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetResources: () => dispatch(coursesActions.resourcesAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
