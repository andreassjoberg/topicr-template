import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import PollSelectForm from './pollSelectForm'



class Pollr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            isLoggedIn: false
        };
    }

    handleSelectFormSubmit(link) {
        console.log(link);
        this.setState(() => ({ isLoggedIn: true }));
    }

    render() {
        return (
            <div className="topicr">
                <div className="container">
                    <div className="page-header text-center">
                        <h1>Pollr</h1>
                    </div>
                </div>
                <PollSelectForm isLoggedIn={this.state.isLoggedIn} onSubmit={this.handleSelectFormSubmit.bind(this)}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Pollr/>,
    document.getElementById('content')
);