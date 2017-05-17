import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class PollSelectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: ''
        };
    }
    handleLinkChanged(event) {
        this.setState({ link: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var link = this.state.link.trim();
        if (!link) {
            return;
        }
        this.props.onSubmit(link);
    }

    render() {
        const isLoggedIn = this.props.isLoggedIn;
        if (isLoggedIn) {
            return null;
        }

        return (
            <div>
                <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
                    <h2>Enter form link</h2>
                    <input className="form-control" type="text" placeholder="Poll link..." value={this.state.link} onChange={this.handleLinkChanged.bind(this)} autoFocus />
                    <button className="btn btn-lg btn-primary" type="submit">Go to poll</button>
                </form>
            </div>
        );
    }
}

PollSelectForm.propTypes = {
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool
}

export default PollSelectForm;