import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import PollForm from './pollForm';
import PollSelectForm from './pollSelectForm';

class Pollr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            isLoggedIn: false,
            pollData: {}
        };
    }

    loadPollFromServer() {
        if (!this.state.link) {
            return;
        }
    }

    handleSelectFormSubmit(link) {
        axios.get(this.props.url + "/" + link)
            .then(response => {
                if (response.status === 200) {
                    sessionStorage["pollLink"] = link;
                    this.setState({ isLoggedIn: true, pollData: response.data });
                } else {
                    console.log(response.status);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillMount() {
        if (sessionStorage["pollLink"]) {
            this.handleSelectFormSubmit(sessionStorage["pollLink"]);
        }
    }

    render() {
        const link = this.state.link;
        return (
            <div className="topicr">
                <div className="container">
                    <div className="page-header text-center">
                        <h1>Pollr</h1>
                        Cheat sheet: MWRlYTgzMzMtMWRj
                    </div>
                </div>
                <PollForm pollData={this.state.pollData}/>
                <PollSelectForm isLoggedIn={this.state.isLoggedIn} onSubmit={this.handleSelectFormSubmit.bind(this)}/>
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