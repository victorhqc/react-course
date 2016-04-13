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

    shouldComponentUpdate(nextProps, nextState) {
        if(
            this.props.refresh !== nextProps.refresh ||
            nextState !== this.state
        ) {
            return true;
        }

        return false;
    }

    search() {
        let needle = this.refs.search.value;
        console.log('needle', needle);
        if(!needle) {
            return this.setState({users: []});
        }

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
        console.log('hola estoy en search');
        return (
            <div className="search-component">
                <input
                    className="form-control"
                    ref="search"
                    type="text"
                    onChange={this.search.bind(this)}
                    />
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
SearchComponent.defaultProps = {
    refresh: false,
    searchParameters: ['name'],
    title: 'name',
    description: 'email'
};

export default SearchComponent;
