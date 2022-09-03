import React, { Component } from 'react';
import MyNavBar from '../../components/MyNavbar';

class Home extends Component {
    render() {
        return (
            <div>
                <MyNavBar/>
                <h1>Home page</h1>
            </div>
        )
    }
}

export default Home