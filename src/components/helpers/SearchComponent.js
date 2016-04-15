'use strict';

import React from 'react';
import { ListComponent } from './ListComponent';

//const _ = require('lodash');

require('styles/helpers/Search.less');

class SearchComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {data: props.data};
        //this.searchInData = _.debounce(this.searchInData, 350);
        this.search = this.search.bind(this);
    }

    searchInData(needle) {
        return new Promise((resolve, reject) => {
            let rx = new RegExp(needle, 'gi');

            let found = this.props.data.filter((data) => {
                let found = false;
                this.props.searchParameters.forEach(search => {
                    if(data[search].match(rx)) {
                        found = true;
                        return false;
                    }
                });

                if(found) { return data; }
            });

            if(found.length === 0) {
                return reject({
                    error: 'Data Not Found'
                });
            }

            return resolve(found);
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(
            this.props.data !== nextProps.data ||
            nextState !== this.state
        ) {
            return true;
        }

        return false;
    }

    search() {
        console.log('this', this);
        let needle = this.refs.search.value;
        if(!needle) {
            this.props.onSearch([]);
            return this.setState({data: []});
        }

        this.searchInData(needle)
        .then(data => {
            this.props.onSearch(data);
            this.setState({data: data});
        })
        .catch(e => {
            this.setState({data: []});
            this.props.onSearch([], e);
            console.log(e);
        });
    }

    renderSuggestions() {
        if(!this.props.suggestions) { return ''; }
        return <ListComponent
            data={this.state.data}
            chosenMiddle={this.props.fromSuggestion}
            />;
    }

    render() {
        return (
            <div className="search-component">
                <div className="input-group">
                    <input
                        className="form-control"
                        ref="search"
                        type="text"
                        onChange={this.search}
                        />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this.search}>
                            Search
                        </button>
                    </span>
                </div>
                <br />
                {this.renderSuggestions()}
            </div>
        );
    }
}

SearchComponent.displayName = 'SearchComponent';

// Uncomment properties you need
// SearchComponent.propTypes = {};
SearchComponent.defaultProps = {
    data: [],
    suggestions: true,
    searchParameters: ['name'],
    title: 'name',
    description: 'email',
    fromSuggestion: function(){},
    onSearch: function(){}
};

export default SearchComponent;
