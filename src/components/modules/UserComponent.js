'use strict';

import React from 'react';

require('styles/modules/User.less');

class UserComponent extends React.Component {

    renderEmpty() {
        return <h1>You have to choose a User</h1>
    }

    renderUser() {
        const user = this.props.user;

        return <h1>{user.name}</h1>
    }

    render() {
        console.log('hola estoy en user');
        const element = this.props.user ? this.renderUser() : this.renderEmpty();

        return (
            <div className="user-component">
                {element}
            </div>
        );
    }
}

UserComponent.displayName = 'ModulesUserComponent';

// Uncomment properties you need
// UserComponent.propTypes = {};
// UserComponent.defaultProps = {};

export default UserComponent;
