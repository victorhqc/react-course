require('bootstrap/dist/css/bootstrap.css');
require('styles/App.css');

import React from 'react';

let itexicoImage = require('../images/itexico.png');
let reactImage = require('../images/react.png');

class InnerComponent extends React.Component {

    handleClick() {
        // Some other logic goes here
        this.props.clickedShit();
    }

    shouldComponentUpdate() {
        if(this.props.name === nextProps.name) { return false; }

        return true;
    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
                {this.props.name}
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

    detectMouseMove() {
        let elm = document.querySelector('#main-container');
        elm.addEventListener('mousemove', target => {
            this.setState({
                x: target.layerX,
                y: target.layerY
            });
        }, false);
    }

    componentDidMount() {
        this.detectMouseMove();
    }

    click() {
        console.log('Im clicked');
    }

    render() {
        console.log('yo! Im rendered again!');

        let x = this.state.x,
            y = this.state.y,
            style = {
                position: 'absolute',
                transform: 'translate3d(' + x + 'px, ' + y + 'px, 0)'
            };

        return (
            <div className="container" id="main-container" style={{minWdth: 800, minHeight: 800}}>
                <div className="row">
                    <div className="col-sm-6">
                        <image src={itexicoImage} alt="iTexico Logo" height="150"/>
                    </div>
                </div>
                <div>
                    <InnerComponent
                        name="demo"
                        clickedShit={this.click.bind(this)} />
                </div>
                <div className="jumbotron" style={style} id="jumbotron">
                    <div className="row">
                        <div className="col-sm-10">
                            <h1>Welcome to React Course</h1>
                        </div>
                        <div className="col-sm-2">
                            <image src={reactImage} alt="React Logo" height="150"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
