import React, { Component } from 'react'

class Dashboard extends Component {
    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/auth/signin');
        }
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