import React, { Component } from 'react';
import classes from './Classes.module.css';
import * as coursesActions from '../../store/actions/index';
import { connect } from 'react-redux';
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

    render() {
        let progression = null;

        if (this.props.progression) {
            console.log(this.props.progression)
            progression = this.props.progression.map(prog => (
                <CourseBig
                               key={prog.id}
                               name={prog.name}
                               image={prog.image}
                               description={prog.description}
                               clickPlay={(event) => {this.redirectToCourseHandler(event)}}
                               percentageFinished='20%'
                               courseColor={this.state.colorList[Math.floor(Math.random() * this.state.colorList.length)]}
                               nextChapter={prog.progression.chapter_id}/>
            ));
        }

        return (
            <div>
                <br/>
                <h1 className={classes.ClassesTitle}>Vos cours suivis</h1>

                <div className={classes.ClassesCourses}>
                    {progression}
                </div>
            </div>
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
