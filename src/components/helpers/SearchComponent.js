'use strict';

import React from 'react';
import { ListComponent } from './ListComponent';

require('styles/helpers/Search.less');

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

    search() {
        let needle = this.refs.search.value;

        this.searchInUsers(needle)
        .then(users => {
            this.setState({users: users});
        })
        .catch(e => {
            this.setState({users: []});
            console.log(e);
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

SearchComponent.displayName = 'SearchComponent';

// Uncomment properties you need
// SearchComponent.propTypes = {};
// SearchComponent.defaultProps = {};

export default SearchComponent;
