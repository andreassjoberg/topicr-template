import React from 'react';
import { render } from 'react-dom';

class Topicr extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Hello world!</h1>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Topicr/>,
    document.getElementById('content')
);