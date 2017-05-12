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

    render() {
        return (
            <form className="form-group">
                <h2>Post a new topic</h2>
                <input className="form-control" type="text" placeholder="title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
                <input className="form-control" type="text" placeholder="description" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)} />
                <button className="btn btn-lg btn-primary" type="submit">Post topic</button>
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

    componentWillMount() {
        this.loadTopicsFromServer();
        //window.setInterval(this.loadTopicsFromServer, this.props.pollInterval);
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
                <TopicForm />
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
    <Topicr url="/api/topics" pollInterval={2000}/>,
    document.getElementById('content')
);