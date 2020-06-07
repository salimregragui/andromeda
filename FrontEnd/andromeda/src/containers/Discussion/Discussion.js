import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import classes from './Discussion.module.css';
import profileImage from '../../assets/images/profile.jpg';

class Discussion extends Component {
    state = {
        loading: false,
        discussionsLoaded: true
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

        if (!this.props.courses) {
            this.setState({discussionsLoaded: false, loading:true});
        }
    }

    componentDidUpdate() {
        if(this.props.logged && !this.state.discussionsLoaded) {
            console.log("get discussions !");
            this.props.onGetDiscussions();
            this.setState({discussionsLoaded: true, loading: false});
        }
    }

    render() {
        let spinner = null;

        // if (this.state.loading) {
        //     spinner = <Spinner />;
        // }
        return (
            <div>
                {spinner}

                <div className={classes.DiscussionsLeft}>
                    <input type="text" placeholder="Trouver un contact" />
                    <h3>Ma Chat List :</h3>
                    <div className={classes.AllDiscussions}>
                        <div className={classes.aDiscussion}>
                            <img src={profileImage} width="40px" height="40px" />
                            <div className={classes.aDiscussionInfos}>
                                <br/>
                                <span>Jane Doe</span>
                                <br/><br/><br/>
                                Lorem ipsum sit dolores um...
                                <em>12 minutes</em>
                                <br/><br/>
                            </div>
                        </div>
                        <div className={classes.aDiscussion}>
                            <img src={profileImage} width="40px" height="40px" />
                            <div className={classes.aDiscussionInfos}>
                                <br/>
                                <span>Jane Doe</span>
                                <br/><br/><br/>
                                Lorem ipsum sit dolores um...
                                <em>12 minutes</em>
                                <br/><br/>
                            </div>
                        </div>
                        <div className={classes.aDiscussion}>
                            <img src={profileImage} width="40px" height="40px" />
                            <div className={classes.aDiscussionInfos}>
                                <br/>
                                <span>Jane Doe</span>
                                <br/><br/><br/>
                                Lorem ipsum sit dolores um...
                                <em>12 minutes</em>
                                <br/><br/>
                            </div>
                        </div>
                        <div className={classes.selectedDiscussion}>
                            <img src={profileImage} width="40px" height="40px" />
                            <div className={classes.selectedDiscussionInfos}>
                                <br/>
                                <span>Mohammed Said</span>
                                <br/><br/><br/>
                                Lorem ipsum sit dolores um...
                                <em>12 minutes</em>
                                <br/><br/>
                            </div>
                        </div>
                        <div className={classes.aDiscussion}>
                            <img src={profileImage} width="40px" height="40px" />
                            <div className={classes.aDiscussionInfos}>
                                <br/>
                                <span>Jane Doe</span>
                                <br/><br/><br/>
                                Lorem ipsum sit dolores um...
                                <em>12 minutes</em>
                                <br/><br/>
                            </div>
                        </div>
                        <div className={classes.aDiscussion}>
                            <img src={profileImage} width="40px" height="40px" />
                            <div className={classes.aDiscussionInfos}>
                                <br/>
                                <span>Jane Doe</span>
                                <br/><br/><br/>
                                Lorem ipsum sit dolores um...
                                <em>12 minutes</em>
                                <br/><br/>
                            </div>
                        </div>
                        <div className={classes.aDiscussion}>
                            <img src={profileImage} width="40px" height="40px" />
                            <div className={classes.aDiscussionInfos}>
                                <br/>
                                <span>Jane Doe</span>
                                <br/><br/><br/>
                                Lorem ipsum sit dolores um...
                                <em>12 minutes</em>
                                <br/><br/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.DiscussionsRight}>
                    <div className={classes.DiscussionInfos}>
                        <img src={profileImage} width="50px" height="50px" />
                        <br/>
                        <span>Mohammed Said</span>
                        <br/><br/>
                    </div>

                    <div className={classes.mainDiscussion}>
                        <div className={classes.receivedMessage}>
                            Lorem ipsum sit dolores has picuram na porita naste mok tabes.
                            <span>Il y a 5 mins</span>
                            <br/><br/>
                        </div>
                        <div className={classes.receivedMessage}>
                            Lorem ipsum sit dolores has picuram na porita naste mok tabes la clata no ramo 
                            a politam no pero cascado ra mitar.
                            <span>Il y a 5 mins</span>
                            <br/><br/>
                        </div>
                        <div className={classes.sentMessage}>
                            Lorem ipsum sit dolores has picuram na porita naste mok tabes.
                            Consequatur sint aut ratione architecto facere. Iusto dolores rerum qui iusto es
                            <span>Il y a 5 mins</span>
                            <br/><br/>
                        </div>
                        <div className={classes.receivedMessage}>
                            Lorem ipsum sit dolores has picuram na porita naste mok tabes.
                            <span>Il y a 5 mins</span>
                            <br/><br/>
                        </div>
                        <div className={classes.receivedMessage}>
                            Lorem ipsum sit dolores has picuram na porita naste mok tabes.
                            <span>Il y a 5 mins</span>
                            <br/><br/>
                        </div>
                        <div className={classes.receivedMessage}>
                            Lorem ipsum sit dolores has picuram na porita naste mok tabes la clata no ramo 
                            a politam no pero cascado ra mitar.
                            <span>Il y a 5 mins</span>
                            <br/><br/>
                        </div>
                        <div className={classes.sentMessage}>
                            Lorem ipsum sit dolores has picuram na porita naste mok tabes.
                            Consequatur sint aut ratione architecto facere. Iusto dolores rerum qui iusto es
                            <span>Il y a 5 mins</span>
                            <br/><br/>
                        </div>
                        <div className={classes.receivedMessage}>
                            Lorem ipsum sit dolores has picuram na porita naste mok tabes.
                            <span>Il y a 5 mins</span>
                            <br/><br/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        discussions: state.data.discussions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetDiscussions: () => dispatch(coursesActions.discussionsAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);
