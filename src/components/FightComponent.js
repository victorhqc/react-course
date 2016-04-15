'use strict';

const ajax = require('ajax-promise');

import React from 'react';
import TableComponent from './helpers/TableComponent';

require('bootstrap/dist/css/bootstrap.css');
require('styles//Fight.less');

class FightComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {data: [], refresh: false};
        this.loadingState = false;
    }

    getData() {
        this.loadingState = 'loading';
        ajax.get('http://localhost:3001/people')
        .then(data => {
            this.loadingState = 'loaded';
            this.setState({data: data.users, refresh: false});
        })
        .catch(e => console.log('oops!', e) );
    }

    handleClick() {
        this.loadingState = false;
        this.setState({refresh: true});
    }

    componentWillMount() {
        this.getData();
    }

    componentWillUpdate() {
        if(!this.loadingState) {
            this.getData();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextState === this.state) {
            return false;
        }

        return true;
    }

    render() {

        return (
            <div className="fight-component container" style={{marginTop: 50}}>
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn btn-success" onClick={this.handleClick.bind(this)}>
                            Refresh Data!
                        </button>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <TableComponent data={this.state.data} />
                    </div>
                </div>
            </div>
        );
    }
}

FightComponent.displayName = 'FightComponent';

// Uncomment properties you need
// FightComponent.propTypes = {};
// FightComponent.defaultProps = {};

export default FightComponent;
