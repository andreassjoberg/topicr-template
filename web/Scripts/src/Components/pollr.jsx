import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import randomstring from 'randomstring';
import PollForm from './pollForm';
import PollSelectForm from './pollSelectForm';
import PollChart from './pollChart';

class Pollr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            isLoggedIn: false,
            pollData: {}
        };
    }

    loadLinkData(link) {
        if (!link) {
            return;
        }
        axios.get(this.props.url + '/' + link)
            .then(response => {
                if (response.status === 200) {
                    sessionStorage['pollLink'] = link;
                    this.setState({ isLoggedIn: true, pollData: response.data });
                } else {
                    console.error(response.status);
                }
            })
            .catch(error => {
                console.error(error);
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
        axios.post(this.props.url + '/' + link + '/vote/' + alternativeId + '/user/' + userName)
            .then(response => {
                    if (response.status === 200) {
                        this.loadLinkData(link);
                    } else {
                        console.error(response.status);
                    }
                })
            .catch(error => {
                    console.error(error);
                });
    }

    componentWillMount() {
        if (!localStorage['userName']) {
            localStorage['userName'] = randomstring.generate({ length: 10, charset: 'alphanumeric' });
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
                        <h1>Pollr</h1>
                        Cheat sheet: MWRlYTgzMzMtMWRj
                    </div>
                </div>
                <PollForm pollData={this.state.pollData} onVote={this.handleVote.bind(this)}/>
                <PollSelectForm isLoggedIn={this.state.isLoggedIn} onSubmit={this.handleSelectFormSubmit.bind(this)}/>
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