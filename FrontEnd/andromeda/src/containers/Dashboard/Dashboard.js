import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    state = {
        data: null
    }
    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/auth/signin');
        }

        axios.post('http://localhost:8000/api/auth/notification/show', localStorage.getItem('token'))
        .then(response => {
          this.setState({data: response.data});
          console.log(response.data);
        })
        .catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                <h1>My Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard;