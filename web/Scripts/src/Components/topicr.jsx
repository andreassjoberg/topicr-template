import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class TopicList extends React.Component {
    render() {
        var topicNodes = this.props.data.map(function(topic) {
            return (
                <Topic title={topic.title} key={topic.id}>
                    {topic.description}
                </Topic>
            );
        });
        return (
            <div className="row">
                {topicNodes}
            </div>
        );
    }
}

class Topic extends React.Component {
    render() {
        return (
            <div className="topic col-md-4">
                <h2>{this.props.title}</h2>
                {this.props.children}
            </div>
        );
    }
}

class TopicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', description: ''
        };
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var title = this.state.title.trim();
        var description = this.state.description.trim();
        if (!title || !description) {
            return;
        }
        this.props.onTopicSubmit({ title: title, description: description });
        this.setState({ title: '', description: '' });
    }

    render() {
        return (
            <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
                <h2>Post a new topic</h2>
                <input className="form-control" type="text" placeholder="Title..." value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
                <input className="form-control" type="text" placeholder="Description..." value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
                <button className="btn btn-lg btn-primary" type="submit">Post topic</button>
            </form>
        );
    }
}

class ClearTopicsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onClearTopicsSubmit();
    }

    render() {
        return (
            <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
                <button className="btn btn-lg btn-primary" type="submit">Clear topics</button>
            </form>
        );
    }
}

class Topicr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    loadTopicsFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState(prevState => (
                { data: data }
            ));
        }.bind(this);
        xhr.send();
    }

    handleTopicSubmit(topic) {
        var data = new FormData();
        data.append('title', topic.title);
        data.append('description', topic.description);

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.send(data);
    }

    handleClearTopicsSubmit() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.clearUrl, true);
        xhr.send();
    }

    componentWillMount() {
        this.loadTopicsFromServer();
    }

    componentDidMount() {
        var topicsHub = $.connection.topicsHub;
        topicsHub.client.refreshTopics = function() {
            this.loadTopicsFromServer();
        }.bind(this);
        $.connection.hub.start();
    }

    render() {
        return (
            <div className="topicr">
                <div className="container">
                    <div className="page-header text-center">
                        <h1>Topicr</h1>
                    </div>
                </div>
                <TopicList data={this.state.data} />
                <TopicForm onTopicSubmit={this.handleTopicSubmit.bind(this)} />
                <ClearTopicsForm onClearTopicsSubmit={this.handleClearTopicsSubmit.bind(this)} />
            </div>
        );
    }
}

Topicr.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string
}

ReactDOM.render(
    <Topicr url="/api/topics" submitUrl="/api/topics/new" clearUrl="/api/topics/clear"/>,
    document.getElementById('content')
);