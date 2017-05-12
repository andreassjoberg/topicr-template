import React from 'react';
import { render } from 'react-dom';

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
    render() {
        return (
            <div className="topic-form">
                My form
            </div>
        );
    }
}

class Topicr extends React.Component {
    render() {
        return (
            <div className="topicr">
                <div className="container">
                    <div className="page-header text-center">
                        <h1>Topicr</h1>
                    </div>
                </div>
                <TopicList data={this.props.data} />
                <TopicForm />
            </div>
        );
    }
}

var data = [
    { id: 1, title: "Title 1", description: "What's wrong with you?" },
    { id: 2, title: "Title 2", description: "Oh, come on now" }
];

ReactDOM.render(
    <Topicr data={data}/>,
    document.getElementById('content')
);