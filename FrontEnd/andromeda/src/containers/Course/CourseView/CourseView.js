import React, { Component } from 'react';
import classes from './CourseView.module.css';
import { connect } from 'react-redux';
// import * as coursesActions from '../../../store/actions/index';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import {AnimatePresence, motion} from 'framer-motion';
import axios from 'axios';
import likeIcon from '../../../assets/images/like.svg';
import unlikeIcon from '../../../assets/images/unlike.svg';
import Modal from '../../../components/UI/Modal/Modal';
import * as notificationActions from '../../../store/actions/index';

class CourseView extends Component {
    state = {
        currentChapter: 'UX design en action',
        currentChapterVideo: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
        displayedSections: [false, false],
        infos: 'details cours',
        chapterComments: null,
        comment: '',
        response: '',
        commentId: null,
        modalType: null,
        chapterId: null
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
    }

    sectionDisplayHandler = (event) => {
        let sectionsDisplay = this.state.displayedSections;
        sectionsDisplay[event.target.id - 1] = !sectionsDisplay[event.target.id - 1];

        this.setState({displayedSections: sectionsDisplay});
    }

    chapterChangeHandler = (id, name, link) => {
        this.setState({currentChapter: name, currentChapterVideo: link, chapterComments: null, chapterId: id});
        this.getChapterComments(id);
    }

    dataButtonsHandler = (name) => {
        let buttons = document.getElementsByClassName(classes.buttonData);
        console.log(buttons);

        Array.prototype.forEach.call(buttons, button => {
            button.style.color = '#757575';
        });

        if (localStorage.getItem('theme') === 'dark') {
            document.getElementById(name).style.color = 'white';
        }else {
            document.getElementById(name).style.color = '#181818';
        }
        this.setState({infos: name});
    }

    getChapterComments = (chapterId) => {
        axios.get('http://localhost:8000/api/auth/comment/chapter/' + chapterId)
        .then(response => {
            this.setState({chapterComments: response.data.comments});
            console.log(this.state);
        })
        .catch(error => console.log(error));
    }

    respondToCommentHandler = (commentId) => {
        let response = {
            content: this.state.response
        }

        axios.post('http://localhost:8000/api/auth/comment/response/' + commentId, response)
        .then(response => {
            console.log(response);
            this.getChapterComments(response.data.chapter_id);
            this.closeModal();
        })
        .catch(error => console.log(error));
    }

    addCommentHandler = () => {
        let response = {
            content: this.state.comment
        }

        axios.post('http://localhost:8000/api/auth/comment/'+this.state.chapterId, response)
        .then(response => {
            console.log(response);
            this.getChapterComments(this.state.chapterId);
            this.closeModal();
        })
        .catch(error => console.log(error));
    }

    likeComment = (commentId) => {
        axios.get('http://localhost:8000/api/auth/like-unlike-comment/'+commentId)
        .then(response => {
            this.getChapterComments(this.state.chapterId);
            if (response.data.liked === 'liked') {
                this.props.onNotificationAdd({
                    'type': 'success',
                    'content': 'Vous avez liker le commentaire avec succès !',
                    'seen': false,
                    'displayed': false
                });
            } else {
                this.props.onNotificationAdd({
                    'type': 'success',
                    'content': 'Vous avez unliker le commentaire avec succès !',
                    'seen': false,
                    'displayed': false
                });
            }
        })
        .catch(error => console.log(error));
    }

    likeResponse = (responseId) => {
        axios.get('http://localhost:8000/api/auth/like-unlike-response/'+responseId)
        .then(response => {
            this.getChapterComments(this.state.chapterId);

            if(response.data.liked === 'liked') {
                this.props.onNotificationAdd({
                    'type': 'success',
                    'content': 'Vous avez liker la reponse avec succès !',
                    'seen': false,
                    'displayed': false
                });
            } else {
                this.props.onNotificationAdd({
                    'type': 'success',
                    'content': 'Vous avez unliker la reponse avec succès !',
                    'seen': false,
                    'displayed': false
                });
            }
        })
        .catch(error => console.log(error));
    }

    showResponseModal = (commentId) => {
        this.setState({modalType:'response', commentId: commentId});
    }
    showThreadModal = (commentId) => {
        this.setState({modalType:'thread', commentId: commentId});
    }
    showCommentModal = () => {
        this.setState({modalType:'comment'});
    }

    closeModal = () => {
        this.setState({modalType: null, response: '', comment: ''});
    }

    changeInputHandler = (event, type) => {
        if (type === 'response') {
            this.setState({response: event.target.value});
        }
        else if (type === 'comment') {
            this.setState({comment: event.target.value});
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
        let course = null;
        let sections = null;
        let data = null;
        let progression = this.props.progression;
        let modal = null;
        if (this.props.progression) {
            progression = this.props.progression.find(ps => ps.name === this.props.match.params.courseName.split('-').join(' '));
            progression = progression.progression;
        }

        if(this.props.courses && course === null) {
            course = this.props.courses.find(cs => cs.name === this.props.match.params.courseName.split('-').join(' '));
            let section_counter = 0;
            let chapter_counter = 0;
            sections = course.sections.map(section => {
                section_counter++;
                return <div key={section.id} className={classes.CourseViewSection} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                    <h3 id={section_counter} onClick={(event) => {this.sectionDisplayHandler(event)}}>Section {section_counter} : {section.name}</h3>

                    <div className={this.state.displayedSections[section_counter - 1] ? null : classes.chaptersHidden}>
                        {section.chapters.map(chapter => {
                            chapter_counter++;
                            let style = null;

                            if (localStorage.getItem('theme') === 'dark') {
                                style = {backgroundColor: '#2C2839', color:this.state.currentChapter === chapter.name ? '#3459D6' : 'white'};
                            } else {
                                style = {color : this.state.currentChapter === chapter.name ? '#3459D6' : '#757575',
                                textDecoration: this.props.progression ? chapter.id < progression.chapter_id ? 'line-through' : 'none' : null
                                }
                            }
                            return <button 
                                    key={chapter.id}
                                    style={
                                        style
                                    }
                                    onClick={() => {this.chapterChangeHandler(chapter.id, chapter.name, chapter.video)}}
                                    >Chapitre {chapter_counter} : {chapter.name}</button>
                        })}
                    </div>
                </div>
            })
        }

        if (this.state.modalType) {
            if (this.state.modalType === 'response') {
                modal = <Modal width="40" height="170px">
                    <div className={classes.responseModal}>
                        <h2>Repondre au commentaire</h2>
                        <input placeholder="Ecrivez votre réponse ici." type="text" value={this.state.response} onChange={(event) => {this.changeInputHandler(event, 'response')}}/>
                        <button onClick={() => {this.respondToCommentHandler(this.state.commentId)}}>Envoyer reponse</button>
                        <button onClick={this.closeModal}>Annuler</button>
                    </div>
                </Modal>
            }
            else if (this.state.modalType === 'comment') {
                modal = <Modal width="40" height="170px">
                    <div className={classes.responseModal}>
                        <h2>Ajouter un commentaire</h2>
                        <input placeholder="Ecrivez votre commentaire ici." type="text" value={this.state.comment} onChange={(event) => {this.changeInputHandler(event, 'comment')}}/>
                        <button onClick={this.addCommentHandler}>Envoyer le commentaire</button>
                        <button onClick={this.closeModal}>Annuler</button>
                    </div>
                </Modal>
            }
            else if (this.state.modalType === 'thread') {
                let likedButton = <button onClick={() => {this.likeComment(this.state.chapterComments[this.state.commentId].id)}} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}><img src={likeIcon} alt="like" width="10px" height="10px" /></button>
                
                if (this.state.chapterComments[this.state.commentId].likes.some(e => e.user.name === this.props.user.name)) {
                    likedButton = <button onClick={() => {this.likeComment(this.state.chapterComments[this.state.commentId].id)}} style={{backgroundColor: '#e74c3c'}}><img src={unlikeIcon} alt="like" width="10px" height="10px" /></button>
                }
                
                modal = <Modal width="60" height="600px" fullscreen>
                    <div className={classes.threadModal}>
                        <button className={classes.closeThread} onClick={this.closeModal}>x</button>
                        <h2>Thread</h2>
                        <div className={classes.threadModalScroll}>
                            <div className={classes.threadComment} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}>
                                <div className={classes.threadCommentImg} onClick={() => {this.props.history.push('/profile/' + this.state.chapterComments[this.state.commentId].user.name.split(' ').join('-'))}} style={{cursor:'pointer', backgroundImage: this.state.chapterComments[this.state.commentId].user.image ? "url('http://localhost:8000/storage/images/" + this.state.chapterComments[this.state.commentId].user.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                                <div className={classes.threadCommentInfos} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                                    {this.state.chapterComments[this.state.commentId].user.name} 
                                    {this.props.courses.find(cs => cs.name === this.props.match.params.courseName.split('-').join(' ')).user_id === this.state.chapterComments[this.state.commentId].user.id ? <em style={localStorage.getItem('theme') === 'dark' ? {border:'1px solid white'} : null}>Auteur du cours</em> : null}
                                    {this.state.chapterComments[this.state.commentId].user.role === 'Professor' ? <em style={{border: '1px solid #16a085', color:'#16a085'}}>Professeur</em> : null}
                                    {this.state.chapterComments[this.state.commentId].user.role === 'Admin' ? <em style={{border: '1px solid #2ecc71', color:'#2ecc71'}}>Administrateur</em> : null}

                                    <span>{this.state.chapterComments[this.state.commentId].likes.length} likes</span> {likedButton}
                                </div>
                                <div className={classes.threadCommentContent}>
                                    {this.state.chapterComments[this.state.commentId].content}
                                </div>

                                <div className={classes.threadCommentButtons}>
                                    <button style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null} onClick={() => {this.showResponseModal(this.state.chapterComments[this.state.commentId].id)}}>Repondre</button>
                                </div>
                                <br/><br/>
                            </div>
                            {this.state.chapterComments[this.state.commentId].responses.map(response => {
                                let likedResponse = <button onClick={() => {this.likeComment(response.id)}} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}><img src={likeIcon} alt="like" width="10px" height="10px" /></button>
                
                                if (response.likes.some(e => e.user.name === this.props.user.name)) {
                                    likedResponse = <button onClick={() => {this.likeResponse(response.id)}} style={{backgroundColor: '#e74c3c'}}><img src={unlikeIcon} alt="like" width="10px" height="10px" /></button>
                                }
                                return <div key={response.id} className={classes.threadResponse} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}>
                                    <div className={classes.threadResponseImg} onClick={() => {this.props.history.push('/profile/' + this.state.chapterComments[this.state.commentId].user.name.split(' ').join('-'))}} style={{cursor:'pointer', backgroundImage: this.state.chapterComments[this.state.commentId].user.image ? "url('http://localhost:8000/storage/images/" + this.state.chapterComments[this.state.commentId].user.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                                    <div className={classes.threadResponseInfos} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                                        {response.user.name} 
                                        {this.props.courses.find(cs => cs.name === this.props.match.params.courseName.split('-').join(' ')).user_id === this.state.chapterComments[this.state.commentId].user.id ? <em style={localStorage.getItem('theme') === 'dark' ? {border:'1px solid white'} : null}>Auteur du cours</em> : null}
                                        {response.user.role === 'Professor' ? <em style={{border: '1px solid #16a085', color:'#16a085'}}>Professeur</em> : null}
                                        {response.user.role === 'Admin' ? <em style={{border: '1px solid #2ecc71', color:'#2ecc71'}}>Administrateur</em> : null}

                                        <span>{response.likes.length} likes</span> {likedResponse}
                                    </div>
                                    <div className={classes.threadResponseContent}>
                                        {response.content}
                                    </div>

                                    <div className={classes.threadResponseButtons}>
                                        <button style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null} onClick={() => {this.showResponseModal(response.comment_id)}}>Repondre</button>
                                    </div>
                                    <br/><br/>
                                </div>
                            })}
                        </div>
                    </div>
                </Modal>
            }
        }

        if (this.state.infos === 'details cours' && course) {
            data = <React.Fragment>
                <ReactMarkdown source={course.description} />
            </React.Fragment>
        }
        else if (this.state.infos === 'commentaires' && course) {
            let comments = this.state.chapterComments ?
                this.state.chapterComments.map((chapterComment, cid) => {
                    let likedComment = <button onClick={() => {this.likeComment(chapterComment.id)}} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}><img src={likeIcon} alt="like" width="10px" height="10px" /></button>
                
                    if (chapterComment.likes.some(e => e.user.name === this.props.user.name)) {
                        likedComment = <button onClick={() => {this.likeComment(chapterComment.id)}} style={{backgroundColor: '#e74c3c'}}><img src={unlikeIcon} alt="like" width="10px" height="10px" /></button>
                    }
                    return <div key={chapterComment.id} className={classes.comment} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null}>
                        <div className={classes.commentImg} onClick={() => {this.props.history.push('/profile/' + chapterComment.user.name.split(' ').join('-'))}} style={{cursor:'pointer', backgroundImage: chapterComment.user.image ? "url('http://localhost:8000/storage/images/" + chapterComment.user.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                        <div className={classes.commentInfos} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                            {chapterComment.user.name} 
                            {this.props.courses.find(cs => cs.name === this.props.match.params.courseName.split('-').join(' ')).user_id === chapterComment.user.id ? <em style={localStorage.getItem('theme') === 'dark' ? {border:'1px solid white'} : null}>Auteur du cours</em> : null}
                            {chapterComment.user.role === 'Professor' ? <em style={{border: '1px solid #16a085', color:'#16a085'}}>Professeur</em> : null}
                            {chapterComment.user.role === 'Admin' ? <em style={{border: '1px solid #2ecc71', color:'#2ecc71'}}>Administrateur</em> : null}

                            <span>{chapterComment.likes.length} likes</span> {likedComment}
                        </div>
                        <div className={classes.commentContent}>
                            {chapterComment.content}
                        </div>

                        <div className={classes.commentButtons}>
                            {chapterComment.responses.length >= 1 ? <button style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null} onClick={() => {this.showThreadModal(cid)}}>Voir toute la discussion ({chapterComment.responses.length})</button> : null}
                            <button style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null} onClick={() => {this.showResponseModal(chapterComment.id)}}>Repondre</button>
                        </div>
                        <br/><br/>
                    </div>
                }) : <p>Aucun commentaire pour ce chapitre !</p>;
            data = <React.Fragment> 
                <div className={classes.addComment} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                    <h2 style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>Ajouter un commentaire</h2>
                    <button onClick={this.showCommentModal}>Commenter</button>
                </div>

                {comments}
                </React.Fragment>
        }

        return (
            <motion.div id="main" initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition} className={classes.CourseView}>
                <AnimatePresence>
                    {modal}
                </AnimatePresence>
                {course ? <React.Fragment>
                    <div className={classes.CourseViewLeft} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                        <ReactPlayer url={this.state.currentChapterVideo} controls width='600px' height='400px'/>
                        <h2>{course.name}</h2>

                        <div className={classes.CourseViewBar} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color:'white'} : null}>
                            <button id='details cours' className={classes.buttonData} style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839', color: 'white'} : {color: '#181818'}} onClick={() => {this.dataButtonsHandler('details cours')}}>Details du cours</button>
                            <button style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null} id='commentaires' onClick={() => {this.dataButtonsHandler('commentaires')}} className={classes.buttonData}>Commentaires du chapitre</button>
                            <button style={localStorage.getItem('theme') === 'dark' ? {backgroundColor: '#2C2839'} : null} id='projets' onClick={() => {this.dataButtonsHandler('projets')}} className={classes.buttonData}>Projets</button>
                        </div>

                        <div className={classes.CourseViewData}>
                            {data}
                            <br/><br/>
                        </div>

                    </div>

                    <div className={classes.CourseViewRight} style={localStorage.getItem('theme') === 'dark' ? {color:'white'} : null}>
                        <h2>Contenu du cours</h2>
                        {sections}
                        <br/><br/>
                    </div>
                </React.Fragment> : null}
            </motion.div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged,
        courses: state.courses.courses,
        progression: state.courses.progression
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNotificationAdd: (notif) => dispatch(notificationActions.addNotification(notif))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseView);
