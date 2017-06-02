import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn !== this.props.isLoggedIn && nextProps.isLoggedIn) {
            $('#selectForm').fadeOut('slow');
        }
    }

    render() {
        const coverStyle = { display: this.props.disabled ? 'block' : 'none' };

        return (
            <div id="selectForm" className="form-group light-gray max-400">
                <div className="cover" style={coverStyle}>
                    <div className="loader"></div>
                </div>
                <form className="form-padding" onSubmit={event => this.handleSubmit(event)}>
                    <h2>Enter form link</h2>
                    <input className="form-control" type="text" placeholder="Poll link..." value={this.state.link} onChange={event => this.handleLinkChanged(event)} autoFocus />
                    <button className="btn btn-lg btn-primary" type="submit">Go to poll</button>
                </form>
            </div>
        );
    }
}

PollSelectForm.propTypes = {
    onSubmit: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    disabled: PropTypes.bool
}

export default PollSelectForm;
