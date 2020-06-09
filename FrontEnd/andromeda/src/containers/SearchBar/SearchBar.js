import React, { Component } from 'react';
import classes from './SearchBar.module.css';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class SearchBar extends Component {
    state = {
        search: '',
        data: null,
        loading: false,
        typingTimeout: 0,
        showingResults: false
    }

    changeSearchHandler = (event) => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }
        
         if (event.target.value.trim() !== '') {
             this.setState({
                search: event.target.value,
                showingResults: true,
                typingTimeout: setTimeout(() => {
                    if (this.state.search !== '') {
                        this.getAutoCompleteData(this.state.search.trim());
                    }else {
                        this.setState({data: null, showingResults: false});
                    }
                  }, 500)
             });
         }else {
             this.setState({
                 search: '',
                 data: null,
                 showingResults: false
             })
         }
    }

    getAutoCompleteData = (str) => {
        if (!this.state.loading) {
            this.setState({loading: true});
    
            axios.get('http://localhost:8000/api/auth/search/autocomplete/' + str)
            .then(response => {
              this.setState({data:response.data});  
              this.setState({loading: false});
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    goToDataHandler = (type, name) => {
        console.log("ok!");
        if (type === 'course' || type === 'chapter' || type === 'section') {
            this.props.history.push('/course/' + name.split(' ').join('-'));
        }

        if (type === 'user') {
            this.props.history.push('/profile/' + name.split(' ').join('-'));
        }

        if (type === 'resource') {
            this.props.history.push('/ressources');
        }

        if (type === 'task') {
            this.props.history.push('/tasks');
        }

        this.setState({search:'', data:null, showingResults: false});
    }

    hideResultsHandler = () => {
        this.setState({showingResults: false, search: '', data: null});
    }

    render() {
        let searchResults = null;

        if (this.state.loading) {
            searchResults = 'Loading...';
        }

        if (this.state.data && !this.state.loading) {
            if (this.state.data.Chapters.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Chapitres</span>
                    {this.state.data.Chapters.map((chapter, cid) => {
                       let shownName = chapter.chapter_name;
                       let splitName = null;
                       let searched = null;

                       if (this.state.search) {
                            shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                            splitName = shownName.split('|||');
                            searched = splitName[1];
                        }

                       return <div key={'chapter-' + cid} className={classes.searchElement} onClick={() => {this.goToDataHandler('chapter', chapter.course_name)}}>
                           <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                        </div>
                    })}
                </div>]
            }

            if (this.state.data.Sections.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Sections</span>
                    {this.state.data.Sections.map(section => {
                       let shownName = section.section_name;
                       let splitName = null;
                       let searched = null;

                       if (this.state.search) {
                            shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                            splitName = shownName.split('|||');
                            searched = splitName[1];
                        }
                       return <div key={section.id} className={classes.searchElement} onClick={() => {this.goToDataHandler('section', section.course_name)}}>
                           <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                        </div>
                    })}
                </div>]
            }

            if (this.state.data.Courses.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Cours</span>
                    {this.state.data.Courses.map(course => {
                        let shownName = course.name;
                        let splitName = null;
                        let searched = null;
 
                        if (this.state.search) {
                             shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                             splitName = shownName.split('|||');
                             searched = splitName[1];
                         }
                       return <div key={course.id} className={classes.searchElement} onClick={() => {this.goToDataHandler('course', course.name)}}>
                           <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                        </div>
                    })}
                </div>]
            }

            if (this.state.data.Resources.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Ressources</span>
                    {this.state.data.Resources.map(resource => {
                        let shownName = resource.resource_name;
                        let splitName = null;
                        let searched = null;
 
                        if (this.state.search) {
                             shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                             splitName = shownName.split('|||');
                             searched = splitName[1];
                         }
                       return <div key={resource.id} className={classes.searchElement} onClick={() => {this.goToDataHandler('resource', resource.resource_name)}}>
                           <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                        </div>
                    })}
                </div>]
            }

            if (this.state.data.Tasks.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Taches</span>
                    {this.state.data.Tasks.map(task => {
                       let shownName = task.content;
                       let splitName = null;
                       let searched = null;

                       if (this.state.search) {
                            shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                            splitName = shownName.split('|||');
                            searched = splitName[1];
                        }
                      return <div key={task.id} className={classes.searchElement} onClick={() => {this.goToDataHandler('task', task.content)}}>
                          <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                       </div>
                    })}
                </div>]
            }

            if (this.state.data.Users.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Users</span>
                    {this.state.data.Users.map(user => {
                       let shownName = user.name;
                       let splitName = null;
                       let searched = null;

                       if (this.state.search) {
                            shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                            splitName = shownName.split('|||');
                            searched = splitName[1];
                        }
                      return <div key={user.id} className={classes.searchElement} onClick={() => {this.goToDataHandler('user', user.name)}}>
                          <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                       </div>
                    })}
                </div>]
            }

            if (searchResults) {
                searchResults = searchResults.flat(5);
                searchResults.shift();
            } else {
                searchResults = 'Aucun resultat trouvé.';
            }
        }

        return (
            <div className={classes.Search}>
                <input placeholder="Cherchez dans les cours, ressources, utilisateurs, ..." type="text" value={this.state.search} onChange={this.changeSearchHandler} />
                <div className={`${classes.SearchResults} ${this.state.showingResults ? null : classes.hiddenSearch}`}>
                    {searchResults && searchResults !== 'Loading...' && searchResults !== 'Aucun resultat trouvé.' ? searchResults.map((sr, id) => {
                        return <React.Fragment key={id}>
                            {sr}
                        </React.Fragment>
                    }) : <strong>{searchResults}</strong>}
                    <br/>
                </div>
            </div>
        )
    }
}

export default withRouter(SearchBar);
