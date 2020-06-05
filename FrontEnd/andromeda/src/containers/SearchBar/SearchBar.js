import React, { Component } from 'react';
import classes from './SearchBar.module.css';
import axios from 'axios';

class SearchBar extends Component {
    state = {
        search: '',
        data: null,
        loading: false,
        typingTimeout: 0
    }

    changeSearchHandler = (event) => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
         }
     
         this.setState({
            search: event.target.value,
            typingTimeout: setTimeout(() => {
                console.log(this.state);
                if (this.state.search !== '') {
                    this.getAutoCompleteData(this.state.search);
                }else {
                    this.setState({data: null});
                }
              }, 500)
         });
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
        if (type === 'course' || type === 'chapter' || type === 'section') {
            this.props.history.push('/course/' + name.split(' ').join('-'));
        }
    }

    render() {
        let searchResults = null;

        if (this.state.loading) {
            searchResults = 'Loading...';
        }

        if (this.state.data && !this.state.loading) {
            console.log(this.state.data);
            if (this.state.data.Chapters.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Chapitres</span>
                    {this.state.data.Chapters.map(chapter => {
                       let shownName = chapter.name;
                       let splitName = null;
                       let searched = null;

                       if (this.state.search) {
                            shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                            splitName = shownName.split('|||');
                            searched = splitName[1];
                        }
                       return <div key={chapter.id} className={classes.searchElement}>
                           <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                        </div>
                    })}
                </div>]
            }

            if (this.state.data.Sections.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Sections</span>
                    {this.state.data.Sections.map(section => {
                       let shownName = section.name;
                       let splitName = null;
                       let searched = null;

                       if (this.state.search) {
                            shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                            splitName = shownName.split('|||');
                            searched = splitName[1];
                        }
                       return <div key={section.id} className={classes.searchElement}>
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
                       return <div key={course.id} className={classes.searchElement}>
                           <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                        </div>
                    })}
                </div>]
            }

            if (this.state.data.Resources.length >= 1) {
                searchResults = [searchResults, <div className={classes.searchBlock}>
                    <span>Ressources</span>
                    {this.state.data.Resources.map(resource => {
                        let shownName = resource.name;
                        let splitName = null;
                        let searched = null;
 
                        if (this.state.search) {
                             shownName = shownName.toLowerCase().replace(this.state.search.toLowerCase(), '|||' + this.state.search.toLowerCase() + '|||');
                             splitName = shownName.split('|||');
                             searched = splitName[1];
                         }
                       return <div key={resource.id} className={classes.searchElement}>
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
                      return <div key={task.id} className={classes.searchElement}>
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
                      return <div key={user.id} className={classes.searchElement}>
                          <em>{splitName ? splitName[0] : shownName }<em className={classes.searchedElement} dangerouslySetInnerHTML={{ __html: searched }}></em>{splitName ? splitName[2] : null }</em>
                       </div>
                    })}
                </div>]
            }

            if (searchResults) {
                searchResults = searchResults.flat(4);
                searchResults.shift();
                console.log(searchResults);
            }
        }
        return (
            <div className={classes.Search}>
                <input placeholder="Cherchez dans les cours, ressources, utilisateurs, ..." type="text" value={this.state.search} onChange={this.changeSearchHandler} />
                <div className={`${classes.SearchResults} ${this.state.data || this.state.loading || this.state.search ? null : classes.hiddenSearch}`}>
                    {searchResults}
                    <br/>
                </div>
            </div>
        )
    }
}

export default SearchBar;
