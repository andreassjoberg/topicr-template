﻿import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Randomstring from 'randomstring';
import PollForm from './pollForm';
import PollSelectForm from './pollSelectForm';
import PollChart from './pollChart';

class Pollr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            isLoggedIn: false,
            pollData: {},
            alertMessage: '',
            infoMessage: '',
            hasVoted: false
        };
    }

    loadLinkData(link) {
        if (!link) {
            return;
        }
        this.setState({ alertMessage: '' });
        var userName = localStorage['userName'];
        Axios.get(this.props.url + '/' + link + '/user/' + userName)
            .then(response => {
                sessionStorage['pollLink'] = link;
                this.setState({ isLoggedIn: true, pollData: response.data, hasVoted: response.data.hasVoted });
            })
            .catch(() => {
                this.setState({ alertMessage: 'No poll found for given link.' });
            });
    }

    handleSelectFormSubmit(link) {
        this.loadLinkData(link);
    }

    handleVote(link, alternativeId) {
        if (!localStorage['userName']) {
            console.error('No username set!');
            return;
        }
        var userName = localStorage['userName'];
        Axios.post(this.props.url + '/' + link + '/vote/' + alternativeId + '/user/' + userName)
            .then(() => {
                this.setState({ infoMessage: 'Thanks for your vote!' });
                this.loadLinkData(link);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    this.setState({ alertMessage: error.response.data.message });
                } else {
                    this.setState({ alertMessage: 'Unexpected error while voting: ' + error.response.status });
                }
            });
    }

    resetPollLink() {
        sessionStorage.removeItem('pollLink');
        window.location.assign('/');
    }

    componentWillMount() {
        if (!localStorage['userName']) {
            localStorage['userName'] = Randomstring.generate({ length: 10, charset: 'alphanumeric' });
        }
        if (sessionStorage['pollLink']) {
            this.loadLinkData(sessionStorage['pollLink']);
        }
    }

    componentDidMount() {
        var pollsHub = $.connection.pollsHub;
        pollsHub.client.refreshPolls = () => {
            this.loadLinkData(sessionStorage['pollLink']);
        };
        $.connection.hub.start();
    }

    render() {
        return (
            <div className="topicr">
                <div className="container">
                    <div className="page-header text-center">
                        <h1><a href='/'>Pollr</a></h1>
                        Cheat sheet: MWRlYTgzMzMtMWRj
                        <p>
                            <a href='javascript:void(0);' onClick={() => this.resetPollLink()}>Select another poll</a>
                        </p>
                    </div>
                </div>
                { this.state.alertMessage ? 
                    <div className="alert alert-danger" role="alert">{this.state.alertMessage}</div>
                    : null
                }
                {this.state.infoMessage ?
                    <div className="alert alert-success" role="alert">{this.state.infoMessage}</div>
                    : null
                }
                { this.state.hasVoted ?
                    null : 
                    <PollForm pollData={this.state.pollData} onVote={(link, alternativeId) => this.handleVote(link, alternativeId)} />
                }
                <PollSelectForm isLoggedIn={this.state.isLoggedIn} onSubmit={link => this.handleSelectFormSubmit(link)}/>
                <PollChart pollData={this.state.pollData}/>
            </div>
        );
    }
}

Pollr.propTypes = {
    url: PropTypes.string
}

ReactDOM.render(
    <Pollr url="api/polls"/>,
    document.getElementById('content')
);