import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class PollForm extends React.Component {
    render() {
        const { title, description, link, alternatives } = this.props.pollData;
        if (!title || !description || !alternatives) {
            return null;
        }
        var pollAlternatives = alternatives.map(alternative => {
            return (
                <p key={alternative.id}>
                    <a className="btn btn-info" href='javascript:void(0);' onClick={() => this.props.onVote(link, alternative.id)}>
                        {alternative.description}
                    </a>
                </p>
            );
        });

        return (
            <div className="row">
                <div className="col-lg-4 form-group light-gray max-800">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    {pollAlternatives}
                </div>
            </div>
        );
    }
}

PollForm.propTypes = {
    pollData: PropTypes.any,
    onVote: PropTypes.func
}

export default PollForm;