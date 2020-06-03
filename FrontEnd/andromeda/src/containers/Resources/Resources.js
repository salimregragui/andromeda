import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import classes from './Resources.module.css';
import Modal from '../../components/UI/Modal/Modal';

class Resources extends Component {
    state = {
        loading: false,
        resourcesLoaded: true,
        displayedResources: [],
        showModal: false,
        displayedResource: {
            path: '',
            type: '',
        }
    }

    componentDidMount() {
        document.body.style = 'background: #f1f1f4;';
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
            this.setState({resourcesLoaded: false});
        }
    }

    componentDidUpdate() {
        if(this.props.logged && !this.state.resourcesLoaded) {
            console.log("get resources !");
            this.props.onGetResources();
            this.setState({resourcesLoaded: true});
        }

        if (this.props.resources && this.state.displayedResources.length < 1) {
            let displayedResources = [...this.state.displayedResources];
            for (let i = 0; i < this.props.resources.length; i++) {
                displayedResources[i] = true;
            }

            this.setState({displayedResources: displayedResources});
        }
    }

    displayedResourcesHandler = (id) => {
        let displayedResources = [...this.state.displayedResources];
        displayedResources[id] = !displayedResources[id];

        this.setState({displayedResources: displayedResources});
    }

    onError = (e) => {
        console.log(e, 'error in file-viewer');
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

    render() {
        let spinner = null;
        let resources = null;
        let modal = null;

        if (this.state.loading) {
            spinner = <Spinner />
        }

        if (this.props.resources && this.state.displayedResources.length >= 1) {
            resources = this.props.resources.map((resource, id) => {
                return <React.Fragment key={resource.id}>
                    <div className={classes.CourseName} onClick={() => {this.displayedResourcesHandler(id)}}>
                        Cours : {resource.name}
                    </div>

                    <div className={`${classes.ResourcesCourse} ${!this.state.displayedResources[id] ? classes.hiddenInfos : null}`}>
                        {resource.Resources.map((res, id) => {
                            return <div key={res.id} className={classes.ResourceCourse}>
                                <div className={classes.ResourceCourseInfo}>
                                    <span>{res.type}</span>
                                    Resource number {id + 1}
                                </div>
                                <div className={classes.ResourceCourseAddInfo}>
                                    <span>{res.created_at.substring(0, 10)}</span>
                                    <button onClick={() => {this.resourceDisplayHandler(res)}}>Voir</button>
                                </div>
                            </div>
                        })}
                    </div>
                </React.Fragment>
            });
        }

        if (this.state.showModal) {
            modal = <Modal width='80' height='500px' fullscreen>
                 <button className={classes.CloseModal} onClick={this.closeModalHandler}>Fermer</button>
                 <iframe className={this.state.displayedResource.type} width="100%" height="97%"
                 frameborder="0" src={this.state.displayedResource.path}></iframe>
            </Modal>
        }

        return (
            <div className={classes.Resources}>
                {spinner}
                {modal}
                <br/>
                <h1>Toutes vos ressources</h1>

                {resources} 
            </div>
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
