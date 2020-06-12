import React, { Component } from 'react';
import classes from './Classes.module.css';
import * as coursesActions from '../../store/actions/index';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import CourseBig from '../../components/Course/CourseBig/CourseBig';

class Classes extends Component {
    state = {
        progressionLoaded: true,
        colorList: ['#3459D6', '#e74c3c', '#27ae60', '#f39c12', '#3498db', '#f1c40f', '#16a085', '#2c3e50']
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#f1f1f4';

        if (!this.props.progression) {
            this.setState({progressionLoaded: false});
        }
    }

    componentDidUpdate() {
        if (this.props.logged && !this.state.progressionLoaded && !this.props.progression) {
            this.props.onGetProgression();
            this.setState({progressionLoaded: true});
        }
    }

    redirectToCourseHandler = (event) => {
        const name = event.target.getAttribute('name');

        if (name) {
            this.props.history.push('/course/' + name.split(' ').join('-'));
        }
    }

    calculatePercentageFinished = (progressionId) => {
        let totalChaptersFinished = 0;
        this.props.progression[progressionId].sections.map(section => {
            section.chapters.map(chapter => {
                if (chapter.id <= this.props.progression[progressionId].progression.chapter_id) {
                    totalChaptersFinished++;
                }

                return null;
            });

            return null;
        });
        console.log("total finished : " + totalChaptersFinished + "number of chapters : " + this.props.progression[progressionId].numberOfChapter);
        console.log(Math.floor((totalChaptersFinished / this.props.progression[progressionId].numberOfChapter) * 100));
        return Math.floor((totalChaptersFinished / this.props.progression[progressionId].numberOfChapter) * 100);
    }

    getNextChapterName = (progressionId) => {
        let chapterName = '';
        
        if (this.props.progression[progressionId].progression.chapter_id) {
            this.props.progression[progressionId].sections.map(section => {
                section.chapters.map(chapter => {
                    if (chapter.id === this.props.progression[progressionId].progression.chapter_id) {
                        chapterName = chapter.name;
                    }
    
                    return null;
                });
    
                return null;
            });
        }else {
            chapterName = this.props.progression[progressionId].sections[0].chapters[0].name;
        }

        return chapterName;
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
        let progression = null;

        if (this.props.progression) {
            console.log(this.props.progression)
            progression = this.props.progression.map((prog, id) => (
                <CourseBig
                               key={prog.id}
                               name={prog.name}
                               image={prog.image}
                               description={prog.description}
                               clickPlay={(event) => {this.redirectToCourseHandler(event)}}
                               percentageFinished={this.calculatePercentageFinished(id)}
                               courseColor={this.state.colorList[Math.floor(Math.random() * this.state.colorList.length)]}
                               nextChapter={this.getNextChapterName(id)}/>
            ));
        }

        return (
            <motion.div initial="initial" animate="in" exit="out" variants={this.pageVariants} transition={this.pageTransition}>
                <br/>
                <h1 className={classes.ClassesTitle}>Vos cours suivis</h1>

                <div className={classes.ClassesCourses}>
                    {progression}
                </div>
            </motion.div>
        )
    }
}

const mapStateToProps = state => {
    return {
        logged: state.auth.logged,
        progression: state.courses.progression
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProgression: () => {dispatch(coursesActions.coursesProgression())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes);
