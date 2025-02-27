import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as coursesActions from '../../store/actions/index';
import classes from './Discussion.module.css';
import axios from 'axios';
import * as timeago from 'timeago.js';
import {motion} from 'framer-motion';

class Discussion extends Component {
    state = {
        loading: false,
        discussionsLoaded: true,
        currentDiscussion: null,
        currentDiscussionId: null,
        message: ''
    }

    updateDiscussions = null;

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

        if (!this.props.courses) {
            this.setState({discussionsLoaded: false, loading:true});
        }
    }

    componentDidUpdate() {
        if(this.props.logged && !this.state.discussionsLoaded) {
            console.log("get discussions !");
            this.props.onGetDiscussions();
            this.setState({discussionsLoaded: true, loading: false});
            this.updateDiscussions = setInterval(() => {
                this.props.onGetDiscussions();

                if (this.state.currentDiscussion) {
                    if (this.props.discussions[this.state.currentDiscussionId].visibleMessages !== this.state.currentDiscussion.visibleMessages) {
                        this.setState({currentDiscussion: this.props.discussions[this.state.currentDiscussionId]});
                    }
                }
            }, 2000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.updateDiscussions);
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
        axios.post('https://limitless-wildwood-57587.herokuapp.com/api/auth/message/send/groupe', message)
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
                        <div className={classes.selectedDiscussionImg} style={{backgroundImage: discussion.users.image ? "url('https://limitless-wildwood-57587.herokuapp.com/storage/images/" + discussion.users.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                        <div className={classes.selectedDiscussionInfos}>
                            <br/><br/>
                            <span>{discussion.users.name}</span>
                            <br/><br/><br/>
                        {discussion.users.id !== this.props.user.id ? 'Vous : ' : discussion.users.name + ' : '}{discussion.visibleMessages[discussion.visibleMessages.length - 1].text.substring(0, 26)}...
                            <em>{timeago.format(discussion.visibleMessages[discussion.visibleMessages.length - 1].created_at)}</em>
                            <br/><br/>
                        </div>
                    </div>
                    } else {
                        return <div style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null} key={discussion.id} onClick={() => {this.setCurrentDiscussionHandler(discussion, id)}} className={classes.aDiscussion}>
                            <div className={classes.aDiscussionImg} style={{backgroundImage: discussion.users.image ? "url('https://limitless-wildwood-57587.herokuapp.com/storage/images/" + discussion.users.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                            <div className={classes.aDiscussionInfos}>
                                <br/><br/>
                                <span style={localStorage.getItem('theme') === 'dark' ? {color: 'white'} : null}>{discussion.users.name}</span>
                                <br/><br/><br/>
                                {discussion.users.id !== this.props.user.id ? 'Vous : ' : discussion.users.name + ' : '}{discussion.visibleMessages[discussion.visibleMessages.length - 1].text.substring(0, 26)}...
                                <em>{timeago.format(discussion.visibleMessages[discussion.visibleMessages.length - 1].created_at)}</em>
                                <br/><br/>
                            </div>
                        </div>
                    }
                }
                else {
                    return <div style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null} key={discussion.id} onClick={() => {this.setCurrentDiscussionHandler(discussion, id)}} className={classes.aDiscussion}>
                    <div className={classes.aDiscussionImg} style={{backgroundImage: discussion.users.image ? "url('https://limitless-wildwood-57587.herokuapp.com/storage/images/" + discussion.users.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                    <div className={classes.aDiscussionInfos}>
                        <br/><br/>
                        <span style={localStorage.getItem('theme') === 'dark' ? {color: 'white'} : null}>{discussion.users.name}</span>
                        <br/><br/><br/>
                        {discussion.users.id !== this.props.user.id ? 'Vous : ' : discussion.users.name + ' : '}{discussion.visibleMessages[discussion.visibleMessages.length - 1].text.substring(0, 26)}...
                        <em>{timeago.format(discussion.visibleMessages[discussion.visibleMessages.length - 1].created_at)}</em>
                        <br/><br/>
                    </div>
                </div>
                }
            });
        }
        return (
            <motion.div initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition}>
                {spinner}

                <div className={classes.DiscussionsLeft} style={localStorage.getItem('theme') === 'dark' ? {color: 'white'} : null}>
                    <input style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null} type="text" placeholder="Trouver un contact" />
                    <h3 style={localStorage.getItem('theme') === 'dark' ? {color: 'white'} : null}>Ma Chat List :</h3>
                    <div className={classes.AllDiscussions}>
                        {discussions}
                    </div>
                </div>

                <div className={classes.DiscussionsRight} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor:'#2C2839', color: 'white'} : null}>
                    {this.state.currentDiscussion ? <React.Fragment><div className={classes.DiscussionInfos}>
                    <div className={classes.DiscussionInfosImg} style={{backgroundImage: this.state.currentDiscussion.users.image ? "url('https://limitless-wildwood-57587.herokuapp.com/storage/images/" + this.state.currentDiscussion.users.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                        <br/>
                        <span style={localStorage.getItem('theme') === 'dark' ? {color: 'white'} : null}>{this.state.currentDiscussion.users.name}</span>
                        <br/><br/>
                    </div>

                    <div className={classes.mainDiscussion}>
                        {this.state.currentDiscussion.visibleMessages.map(message => {
                            if (message.user_id === this.props.user.id) {
                                return <div key={message.id + '-' + message.user_id} className={classes.sentMessageHolder}>
                                    <div className={classes.sentMessage}>
                                        {message.text}
                                        <br/>
                                        <span>{timeago.format(message.created_at)}</span>
                                        <br/><br/>
                                    </div>
                                </div>
                            } else {
                                return <div key={message.id + '-' + message.user_id} className={classes.receivedMessageHolder}>
                                    <div className={classes.receivedMessage}>
                                        {message.text}
                                        <br/>
                                        <span>{timeago.format(message.created_at)}</span>
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
            </motion.div>
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
