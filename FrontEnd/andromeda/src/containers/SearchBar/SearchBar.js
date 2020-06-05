import React, { Component } from 'react';
import classes from './SearchBar.module.css';

class SearchBar extends Component {
    state = {
        search: '',
        data: null,
        loading: false
    }

    changeSearchHandler = (event) => {
        this.setState({search : event.target.value});
        this.getAutoCompleteData(event.target.value);
    }

    getAutoCompleteData = (str) => {
        this.setState({loading: true});

        // axios.get('http://localhost:8000/api/auth/resource', this.props.user)
        // .then(response => {
        //   console.log(response.data);
        //   this.setState({data:response.data});  
        //   this.setState({loading: false});
        // })
        // .catch(error => {
        //     console.log(error)
        //     this.setState({loading: false});
        //     this.props.history.push({
        //         pathname: '/error',
        //         state: {
        //             error: error
        //         }
        //       });
        // })
    }
    render() {
        return (
            <div className={classes.Search}>
                <input placeholder="Cherchez dans les cours, ressources, utilisateurs, ..." type="text" value={this.state.search} onChange={this.changeSearchHandler} />
                <div className={classes.SearchResults}>

                </div>
            </div>
        )
    }
}

export default SearchBar;
