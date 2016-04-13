require('bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React from 'react';
import SearchComponent from './helpers/SearchComponent';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0
        };
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    getUser(user) {
        console.log('user', user);
    }

    render() {

        return (
        <div className="container">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <h2>Search for Users</h2>
                <SearchComponent
                    chosenMain={this.getUser.bind(this)}/>
            </form>
        </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
