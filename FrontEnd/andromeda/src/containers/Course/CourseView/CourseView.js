import React, { Component } from 'react';
import classes from './CourseView.module.css';
import { connect } from 'react-redux';
// import * as coursesActions from '../../../store/actions/index';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import {motion} from 'framer-motion';
import axios from 'axios';
import likeIcon from '../../../assets/images/like.svg';
import unlikeIcon from '../../../assets/images/unlike.svg';

class CourseView extends Component {
    state = {
        currentChapter: 'UX design en action',
        currentChapterVideo: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
        displayedSections: [false, false],
        infos: 'details cours',
        chapterComments: null
    }
    componentDidMount() {
        document.body.style.backgroundColor = '#f1f1f4';

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
        this.setState({currentChapter: name, currentChapterVideo: link, chapterComments: null});
        this.getChapterComments(id);
    }

    dataButtonsHandler = (name) => {
        let buttons = document.getElementsByClassName(classes.buttonData);
        console.log(buttons);

        Array.prototype.forEach.call(buttons, button => {
            console.log("button");
            button.style.color = '#757575';
        });

        document.getElementById(name).style.color = '#181818';
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
                return <div key={section.id} className={classes.CourseViewSection}>
                    <h3 id={section_counter} onClick={(event) => {this.sectionDisplayHandler(event)}}>Section {section_counter} : {section.name}</h3>

                    <div className={this.state.displayedSections[section_counter - 1] ? null : classes.chaptersHidden}>
                        {section.chapters.map(chapter => {
                            chapter_counter++;
                            return <button 
                                    key={chapter.id}
                                    style={
                                        {color : this.state.currentChapter === chapter.name ? '#3459D6' : '#757575',
                                        textDecoration: this.props.progression ? chapter.id < progression.chapter_id ? 'line-through' : 'none' : null
                                        }
                                    }
                                    onClick={() => {this.chapterChangeHandler(chapter.id, chapter.name, chapter.video)}}
                                    >Chapitre {chapter_counter} : {chapter.name}</button>
                        })}
                    </div>
                </div>
            })
        }

        if (this.state.infos === 'details cours' && course) {
            data = <React.Fragment>
                <ReactMarkdown source={course.description} />
            </React.Fragment>
        }
        else if (this.state.infos === 'commentaires' && course) {
            let comments = this.state.chapterComments ?
                this.state.chapterComments.map(chapterComment => {
                    // let liked = chapterComment.like.some(e => e.user.name === this.props.user.name).length;
                    return <div key={chapterComment.id} className={classes.comment}>
                        <div className={classes.commentImg} style={{backgroundImage: chapterComment.user.image ? "url('http://localhost:8000/storage/images/" + chapterComment.user.image + "')" : "url('http://localhost:3000/profile-placeholder.jpg')"}}></div>
                        <div className={classes.commentInfos}>
                            {chapterComment.user.name}

                            <span>Liker</span> <button><img src={likeIcon} alt="like" width="12px" height="12px" /></button>
                        </div>
                        <div className={classes.commentContent}>
                            {chapterComment.content}
                        </div>

                        <div className={classes.commentButtons}>
                            <button>Voir toute la discussion ({chapterComment.responses.length})</button>
                        </div>
                        <br/><br/>
                    </div>
                }) : <p>Aucun commentaire pour ce chapitre !</p>;
            data = <React.Fragment> 
                <div className={classes.addComment}>
                    <h2>Ajouter un commentaire</h2>
                    <button>Commenter</button>
                </div>

                {comments}
                </React.Fragment>
        }

        return (
            <motion.div id="main" initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition} className={classes.CourseView}>
                {course ? <React.Fragment>
                    <div className={classes.CourseViewLeft}>
                        <ReactPlayer url={this.state.currentChapterVideo} controls width='600px' height='400px'/>
                        <h2>{course.name}</h2>

                        <div className={classes.CourseViewBar}>
                            <button id='details cours' className={classes.buttonData} style={{color: '#181818'}} onClick={() => {this.dataButtonsHandler('details cours')}}>Details du cours</button>
                            <button id='commentaires' onClick={() => {this.dataButtonsHandler('commentaires')}} className={classes.buttonData}>Commentaires</button>
                            <button id='projets' onClick={() => {this.dataButtonsHandler('projets')}} className={classes.buttonData}>Projets</button>
                        </div>

                        <div className={classes.CourseViewData}>
                            {data}
                            <br/><br/>
                        </div>

                    </div>

                    <div className={classes.CourseViewRight}>
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

export default connect(mapStateToProps, null)(CourseView);
