require('bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React from 'react';
import SearchComponent from './helpers/SearchComponent';
import UserComponent from './modules/UserComponent';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    getUser(user) {
        this.setState({user: user});
    }

    render() {

        return (
        <div className="container">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <h2>Search for Users</h2>
                <SearchComponent
                    chosenMain={this.getUser.bind(this)}/>
            </form>

            <UserComponent user={this.state.user} />

        </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
