require('bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React from 'react';

let itexicoImage = require('../images/itexico.png');
let reactImage = require('../images/react.png');

const users =  [
    {
        id: 1,
        name: 'Victor',
        email: 'vquiroz@itexico.net'
    },
    {
        id: 2,
        name: 'Antares',
        email: 'afarias@itexico.net'
    },
    {
        id: 3,
        name: 'Abraham',
        email: 'apanduro@itexico.net'
    },
    {
        id: 4,
        name: 'Juan Perrito',
        email: 'juan@perrito.com'
    }
];

class ListChildComponent extends React.Component {
    handleClick(e) {
        this.props.myClick(this.props.element);
    }

    render() {
        return (
            <li onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </li>
        );
    }
};

class ListComponent extends React.Component {

    renderChildren() {
        return this.props.data.map((element, i) => {
            return <ListChildComponent
                id={i}
                element={element}
                myClick={this.props.chosenMiddle}
                key={i}>
                    {element.name}
            </ListChildComponent>;
        });
    }

    render() {
        return (
            <ul className="list-component">
                {this.renderChildren()}
            </ul>
        );
    }
}

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {users: []};
    }

    searchInUsers(needle) {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                let rx = new RegExp(needle, 'gi');

                let found = users.filter((user) => {
                    if(user.name.match(rx)) {
                        return user;
                    }
                });

                if(found.length === 0) {
                    return reject({
                        error: 'User Not Found'
                    });
                }

                return resolve(found);
            }, 100);
        });
    }

    search(e) {
        let needle = this.refs.search.value;

        this.searchInUsers(needle)
        .then(users => {
            this.setState({users: users});
        })
        .catch(e => {
            this.setState({users: []});
            console.log(e)
        });
    }

    render() {
        return (
            <div className="search-component">
                <input
                    className="form-control"
                    ref="search"
                    type="text" />
                <button
                    className="btn btn-success"
                    onClick={this.search.bind(this)}>
                    Search
                </button>
                <br />
                <ListComponent
                    data={this.state.users}
                    chosenMiddle={this.props.chosenMain}
                    />
            </div>
        );
    }
}

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
