import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

class PollVoteForm extends React.Component {
    render() {
        const { title, description, link, alternatives } = this.props.pollData;
        if (!title || !description || !alternatives) {
            return null;
        }
        var pollAlternatives = alternatives.map(alternative => {
            return (
                <div className="col-md-4" key={alternative.id}>
                    <a className="btn btn-info" href='javascript:void(0);' onClick={() => this.props.onVote(link, alternative.id)}>
                        {alternative.description}
                    </a>
                </div>
            );
        });

        return (
            <div className="form-group light-gray max-800">
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="row">
                    {pollAlternatives}
                </div>
            </div>
        );
    }
}

PollVoteForm.propTypes = {
    pollData: PropTypes.any,
    onVote: PropTypes.func
}

export default PollVoteForm;
