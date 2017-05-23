import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class PollForm extends React.Component {
    handleAlternativeSelect(pollId, alternativeId) {
        console.log('Poll id: ' + pollId + ' alternative id: ' + alternativeId);
    }

    render() {
        const { id, title, description, alternatives } = this.props.pollData;
        if (!title || !description || !alternatives) {
            return null;
        }
        var pollAlternatives = alternatives.map(alternative => {
            return (
                <p key={alternative.id}>
                    <a href="javascript:void(0);" onClick={this.handleAlternativeSelect.bind(this, id, alternative.id)}>
                        {alternative.description}
                    </a>
                </p>
            );
        });

        return (
            <div className="row">
                <div className="col-lg-4 form-group max-800">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    {pollAlternatives}
                </div>
            </div>
        );
    }
}

PollForm.propTypes = {
    pollData: PropTypes.any
}

export default PollForm;