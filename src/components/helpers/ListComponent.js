'use strict';

import React from 'react';

require('styles/helpers/List.less');

export class ListChildComponent extends React.Component {
    handleClick() {
        this.props.myClick(this.props.element);
    }

    render() {
        console.log('hoa estoy en child');
        return (
            <li onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </li>
        )
    }
}

export class ListComponent extends React.Component {

    renderChildren() {
        return this.props.data.map((element, i) => {
            return <ListChildComponent
                id={i}
                element={element}
                myClick={this.props.chosenMiddle}
                key={i}>
                    <h2>{ element.name }</h2>
                    <p>{ element.email }</p>
            </ListChildComponent>;
        });
    }

    render() {
        console.log('hola estoy en list');
        return (
            <ul className="list-component">
                {this.renderChildren()}
            </ul>
        );
    }
}

ListComponent.displayName = 'ListComponent';

// Uncomment properties you need
// ListComponent.propTypes = {};
// ListComponent.defaultProps = {};
