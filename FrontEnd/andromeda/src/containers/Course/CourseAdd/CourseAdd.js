import React, { Component } from 'react';
import classes from './CourseAdd.module.css';
import { connect } from 'react-redux';
import * as coursesActions from '../../../store/actions/index';
import axios from 'axios';

class CourseAdd extends Component {
    state = {
        courseData: {
            name: '',
            description:'',
            sections: [
                {
                    name: '',
                    chapters: [
                        {
                            name:'',
                            link: ''
                        }
                    ]
                }
            ],
            sectionsDisplay : [true],
            chaptersDisplay : [[true]]
        }
    }
    componentDidMount() {
        document.body.style.backgroundColor = '#f1f1f4';

        if (!localStorage.getItem('token')) {
            this.props.history.push('/auth/signin');
        }
    }

    componentDidUpdate() {
        if(this.props.user) {
            if(this.props.user.role !== 'Professor' && this.props.user.role !== 'Admin') {
                this.props.history.push('/dashboard');
            }
        }
    }

    sectionAddHandler = () => {
        let sections = [...this.state.courseData.sections];
        sections.push({name: '', chapters: []});

        let sectionsDisplay = [...this.state.courseData.sectionsDisplay];
        sectionsDisplay.push(true);

        let chaptersDisplay = [...this.state.courseData.chaptersDisplay];
        chaptersDisplay.push([]);

        this.setState((prevState) => ({
            courseData: {
                ...prevState.courseData,
                sections: sections,
                sectionsDisplay: sectionsDisplay,
                chaptersDisplay: chaptersDisplay
            }}));
    }

    chapterAddHandler = (event, sectionId) => {
        event.preventDefault();
        let chapters = [...this.state.courseData.sections[sectionId].chapters];
        chapters.push({name: '', link: ''});

        let sections = [...this.state.courseData.sections];
        let section = {...sections[sectionId]}
        section.chapters = chapters;

        sections[sectionId] = section;

        let chaptersDisplay = [...this.state.courseData.chaptersDisplay];
        chaptersDisplay[sectionId].push(true);

        this.setState((prevState) => ({
            courseData: {
                ...prevState.courseData,
                sections: sections,
                chaptersDisplay: chaptersDisplay
            }}));
    }

    displaySectionsHandler = (sectionId) => {
        let sectionsDisplay = this.state.courseData.sectionsDisplay;
        sectionsDisplay[sectionId] = !sectionsDisplay[sectionId]

        this.setState({sectionsDisplay: sectionsDisplay});
    }

    displayChaptersHandler = (sectionId, chapterId) => {
        let chaptersDisplay = this.state.courseData.chaptersDisplay;
        chaptersDisplay[sectionId][chapterId] = !chaptersDisplay[sectionId][chapterId];

        this.setState({chaptersDisplay: chaptersDisplay});
    }

    changedValueHandler = (event, sectionId, chapterId, stateName) => {
        if (chapterId === null && sectionId !== null) {
            let courseData = {...this.state.courseData};
            courseData.sections[sectionId][stateName] = event.target.value;

            this.setState({courseData: courseData});
        }
        else if (sectionId !== null && chapterId !== null) {
            let courseData = {...this.state.courseData};
            courseData.sections[sectionId].chapters[chapterId][stateName] = event.target.value;

            this.setState({courseData: courseData});
        }
        else if (sectionId === null && chapterId === null) {
            let courseData = {...this.state.courseData};
            courseData[stateName] = event.target.value;

            this.setState({courseData: courseData});
        }
    }

    removeHandler = (type, sectionId, chapterId) => {
        if (type === 'section') {
            let courseData = {...this.state.courseData};
            courseData.sections = courseData.sections.filter((section,sid) => {
                return sid !== sectionId
            });

            this.setState({courseData: courseData});
        }
        else if (type === 'chapter') {
            let courseData = {...this.state.courseData};
            courseData.sections[sectionId].chapters = courseData.sections[sectionId].chapters.filter((chapter,cid) => {
                return cid !== chapterId
            });

            this.setState({courseData: courseData});
        }
    }

    courseSaveHandler = (event) => {
        event.preventDefault();
        let courseInfos = new FormData();
        courseInfos.append('name', this.state.courseData.name);
        courseInfos.append('description', this.state.courseData.description);
        courseInfos.append('rating', 0);
        courseInfos.append('image', document.getElementById('imageCourse').files[0]);

        const config = {
            headers:{'Content-Type' : 'multipart/form-data'}
        };

        axios.post('http://localhost:8000/api/auth/course', courseInfos, config)
        .then(response => {
          console.log(response.data);
          let courseId = response.data.courseId;

          this.state.courseData.sections.map((section, sid) => {
            let sectionInfos = {
                name: section.name,
                number: sid
            }
            axios.post('http://localhost:8000/api/auth/section/' + courseId, sectionInfos)
            .then(response => {
                console.log(response.data);
                let sectionId = response.data.sectionId;
                this.state.courseData.sections[sid].chapters.map((chapter, id) => {
                    let chapterInfos = {
                        name: chapter.name,
                        number: id,
                        link: chapter.link
                    }

                    axios.post('http://localhost:8000/api/auth/chapter/' + sectionId, chapterInfos)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error.response.data);
                    })
                    return null;
                });
            })
            .catch(error => {
                console.log(error.response.data);
            })
            return null;
          });
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }

    render() {
        let sections = null;

        if (this.state.courseData.sections) {
            sections = this.state.courseData.sections.map((section, sid) => {
                return <div key={sid} className={classes.sectionForm}>
                            <h4 onClick={() => {this.displaySectionsHandler(sid)}}>Section {sid + 1}</h4>
                            <button type="button" onClick={() => {this.removeHandler('section', sid, null)}}>X</button>
                            <div className={!this.state.courseData.sectionsDisplay[sid] ? classes.hiddenInfos : null}>
                                <input type="text" value={this.state.courseData.sections[sid].name} onChange={(event) => {this.changedValueHandler(event, sid, null, 'name')}} placeholder="Nom de la section" />
                                
                                {section.chapters.map((chapter, id) => {
                                    return <div key={chapter + '-' + id} className={classes.chapterForm}>
                                                <h5 onClick={() => {this.displayChaptersHandler(sid, id)}}>Chapitre {id + 1}</h5>
                                                <button type="button" onClick={() => {this.removeHandler('chapter', sid, id)}}>X</button>
                                                <div className={!this.state.courseData.chaptersDisplay[sid][id] ? classes.hiddenInfos : null}>
                                                    <input type="text" value={this.state.courseData.sections[sid].chapters[id].name} onChange={(event) => {this.changedValueHandler(event, sid, id, 'name')}} placeholder="Nom du chapitre" />
                                                    <input type="text" value={this.state.courseData.sections[sid].chapters[id].link} onChange={(event) => {this.changedValueHandler(event, sid, id, 'link')}} placeholder="Video du chapitre" />
                                                </div>
                                            </div>
                                })}
                                <div style={{float:'right', width:'100%'}}>
                                <a href="/" onClick={(event) => {this.chapterAddHandler(event, sid)}}>Ajouter Chapitre</a>
                                </div>
                            </div>
                        </div>
            });
        }
        return (
            <div className={classes.CourseAdd}>
                <h1>Ajouter un cours</h1>
                <form onSubmit={(event) => {this.courseSaveHandler(event)}}>
                    <input type="text" placeholder="Nom du cours" value={this.state.courseData.name} onChange={(event) => {this.changedValueHandler(event, null, null, 'name')}} /><br/>
                    <textarea placeholder="Description du cours" value={this.state.courseData.description} onChange={(event) => {this.changedValueHandler(event, null, null, 'description')}}></textarea>
                    <br/>
                    <label>Image du cours:</label><br/>
                    <input type="file" id="imageCourse" name="imageCourse" />

                    <h4>Content</h4>
                    <button type="button" onClick={this.sectionAddHandler}>Ajouter Section</button>
                    <button type="submit">Sauvegarder le cours</button>
                    <br/>
                    {sections}
                </form>
                <br/><br/><br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        logged: state.auth.logged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCourses: () => dispatch(coursesActions.coursesAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseAdd);
