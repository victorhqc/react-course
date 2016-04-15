'use strict';

import React from 'react';

require('styles/helpers/Table.less');

/*class ColumnComponent extends React.Component {

}

class HeaderColumnComponent extends React.Component {

}*/

class RowComponent extends React.Component {

    processColumns(children) {
        return children.map(child => {

            /*return React.createElement(
                this.props.header ? 'HeaderColumnComponent' : 'ColumnComponent',
                {}
            )*/

            console.log('child', child);

        });
    }

    render() {
        var { children } = this.props;

        return (
            <tr { ...this.props }>
                {children}
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

    }

    renderBody() {

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
                <thead></thead>
                <tbody></tbody>
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
