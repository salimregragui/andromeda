import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import classes from './Discussion.module.css';
import profileImage from '../../assets/images/profile.jpg';
import axios from 'axios';

class Discussion extends Component {
    state = {
        loading: false,
        discussionsLoaded: true,
        currentDiscussion: null,
        currentDiscussionId: null,
        message: '',
        updateDiscussions : null
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
            this.setState({discussionsLoaded: true, loading: false, updateDiscussions : setInterval(() => {
                this.props.onGetDiscussions();

                if (this.state.currentDiscussion) {
                    if (this.props.discussions[this.state.currentDiscussionId].visibleMessages !== this.state.currentDiscussion.visibleMessages) {
                        this.setState({currentDiscussion: this.props.discussions[this.state.currentDiscussionId]});
                    }
                }
            }, 2000)});
        }
    }

    setCurrentDiscussionHandler = (discussion, discussionId) => {
        this.setState({currentDiscussion: discussion, currentDiscussionId: discussionId});
    }

    changeMessageHandler = (event) => {
        this.setState({message: event.target.value});
    }

    sendMessage = () => {
        let message = {
            'user_id': this.state.currentDiscussion.users.id,
            'text': this.state.message,
            'discussion_id': this.state.currentDiscussion.id
        }
        axios.post('http://localhost:8000/api/auth/message/send/groupe', message)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })

        let currentDiscussion = {...this.state.currentDiscussion};
        currentDiscussion.visibleMessages.push({
            'user_id': this.props.user.id,
            'text': this.state.message,
            'discussion_id': this.state.currentDiscussion.id,
            "attachment": null,
            "read": 0
        })
        this.setState({message: '', currentDiscussion: currentDiscussion});
    }

    render() {
        let spinner = null;
        let discussions = null;

        if (this.state.loading) {
            spinner = <Spinner />;
        }

        if (this.props.discussions) {
            discussions = this.props.discussions.map((discussion, id) => {
                if (this.state.currentDiscussion) {
                    if (discussion.users.name === this.state.currentDiscussion.users.name) {
                        return <div key={discussion.id} className={classes.selectedDiscussion}>
                        <div className={classes.selectedDiscussionImg} style={{backgroundImage: "url('" + profileImage + "')"}}></div>
                        <div className={classes.selectedDiscussionInfos}>
                            <br/><br/>
                            <span>{discussion.users.name}</span>
                            <br/><br/><br/>
                            {discussion.visibleMessages[discussion.visibleMessages.length - 1].text.substring(0, 26)}...
                            <em>12 minutes</em>
                            <br/><br/>
                        </div>
                    </div>
                    } else {
                        return <div key={discussion.id} onClick={() => {this.setCurrentDiscussionHandler(discussion, id)}} className={classes.aDiscussion}>
                            <div className={classes.aDiscussionImg} style={{backgroundImage: "url('" + profileImage + "')"}}></div>
                            <div className={classes.aDiscussionInfos}>
                                <br/><br/>
                                <span>{discussion.users.name}</span>
                                <br/><br/><br/>
                                {discussion.visibleMessages[discussion.visibleMessages.length - 1].text.substring(0, 26)}...
                                <em>12 minutes</em>
                                <br/><br/>
                            </div>
                        </div>
                    }
                }
                else {
                    return <div key={discussion.id} onClick={() => {this.setCurrentDiscussionHandler(discussion, id)}} className={classes.aDiscussion}>
                    <div className={classes.aDiscussionImg} style={{backgroundImage: "url('" + profileImage + "')"}}></div>
                    <div className={classes.aDiscussionInfos}>
                        <br/><br/>
                        <span>{discussion.users.name}</span>
                        <br/><br/><br/>
                        {discussion.visibleMessages[discussion.visibleMessages.length - 1].text.substring(0, 26)}...
                        <em>12 minutes</em>
                        <br/><br/>
                    </div>
                </div>
                }
            });
        }
        return (
            <div>
                {spinner}

                <div className={classes.DiscussionsLeft}>
                    <input type="text" placeholder="Trouver un contact" />
                    <h3>Ma Chat List :</h3>
                    <div className={classes.AllDiscussions}>
                        {discussions}
                    </div>
                </div>

                <div className={classes.DiscussionsRight}>
                    {this.state.currentDiscussion ? <React.Fragment><div className={classes.DiscussionInfos}>
                    <div className={classes.DiscussionInfosImg} style={{backgroundImage: "url('" + profileImage + "')"}}></div>
                        <br/>
                        <span>{this.state.currentDiscussion.users.name}</span>
                        <br/><br/>
                    </div>

                    <div className={classes.mainDiscussion}>
                        {this.state.currentDiscussion.visibleMessages.map(message => {
                            if (message.user_id === this.props.user.id) {
                                return <div key={message.id} className={classes.sentMessageHolder}>
                                    <div className={classes.sentMessage}>
                                        {message.text}
                                        <br/>
                                        <span>Il y a 5 mins</span>
                                        <br/><br/>
                                    </div>
                                </div>
                            } else {
                                return <div key={message.id} className={classes.receivedMessageHolder}>
                                    <div className={classes.receivedMessage}>
                                        {message.text}
                                        <br/>
                                        <span>Il y a 5 mins</span>
                                        <br/><br/>
                                    </div>
                                </div>
                            }
                        })}
                    </div>
                    <div className={classes.inputMessage}>
                        <input type="text" id="messageInput" placeholder="Envoyer un message" value={this.state.message} onChange={(event) => {this.changeMessageHandler(event)}}/>
                        <button onClick={this.sendMessage}>S</button>
                    </div></React.Fragment> : <p><strong>Selectionnez une discussion sur votre gauche.</strong></p>}
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
