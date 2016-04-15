'use strict';

import React from 'react';

require('styles/helpers/Table.less');

class RowComponent extends React.Component {

    renderColumns() {
        return Object.keys(this.props.data).map(column => {

            return React.createElement(
                this.props.header ? 'th' : 'td',
                {
                    header: this.props.header
                },
                [this.props.header ? column : this.props.data[column]]
            );

        });
    }

    render() {
        return (
            <tr>
                {this.renderColumns()}
            </tr>
        );
    }
}

RowComponent.defaultProps = {
    header: false
};

class TableComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {data: [], columns: []};
    }

    /**
     * Gets the columns and filter the ones we want to omit
     *
     * @method processData
     * @param  {Object}    props
     * @return {Object}    processed data
     */
    processData(props) {
        var init = new Date();

        // Filters unwanted columns
        var data = props.data.map(chunk => {

            Object.keys(chunk).filter(column => {
                if(props.hiddenColumns.indexOf(column) >= 0) {
                    delete chunk[column];
                }
            });

            return chunk;
        });

        var columns = data.length > 0 ? Object.keys(data[0]) : [];

        this.setState({data: data, columns: columns});

        var end = new Date();
        console.log(Math.abs(init - end), 'milliseconds to process data');
        return data;
    }

    renderHeader() {
        if(this.state.data.length === 0) { return false; }

        return <RowComponent data={this.state.data[0]} header={true} />
    }

    renderBody() {
        return this.state.data.map((row, index) => {
            return <RowComponent key={index} data={row}/>;
        })
    }

    componentWillMount() {
        this.processData(this.props);
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.data !== nextProps.data) {
            this.processData(nextProps);
        }
    }

    shouldComponentUpdate(nextProps) {
        if(this.props === nextProps) {
            return false;
        }

        return true;
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    { this.renderHeader() }
                </thead>
                <tbody>
                    { this.renderBody() }
                </tbody>
            </table>
        );
    }
}

TableComponent.displayName = 'HelpersTableComponent';

// Uncomment properties you need
// TableComponent.propTypes = {};
TableComponent.defaultProps = {
    data: [],
    hiddenColumns: [],
    ignoreOnSearch: []
};

export default TableComponent;
