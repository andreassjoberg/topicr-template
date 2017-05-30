import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

class PollChart extends React.Component {
    render() {
        const { title, description, alternatives } = this.props.pollData;
        if (!alternatives) {
            return null;
        }

        var data = alternatives.map(alternative => {
            return alternative.votes;
        });
        var labels = alternatives.map(alternative => {
            return alternative.description;
        });

        var chartData = {
            labels: labels,
            datasets: [
                {
                    label: title,
                    data: data,
                    borderWidth: 2,
                    backgroundColor: [
                        'rgba(146, 43, 33, 0.2)',
                        'rgba(36, 113, 163, 0.2)',
                        'rgba(183, 149, 11, 0.2)',
                        'rgba(160, 64, 0, 0.2)',
                        'rgba(179, 182, 183, 0.2)',
                        'rgba(20, 143, 119, 0.2)',
                        'rgba(97, 106, 107, 0.2)',
                        'rgba(118, 68, 138, 0.2)',
                        'rgba(46, 64, 83, 0.2)',
                        'rgba(175, 96, 26, 0.2)'
                    ],
                    borderColor: [
                        'rgba(146, 43, 33, .8)',
                        'rgba(36, 113, 163, .8)',
                        'rgba(183, 149, 11, .8)',
                        'rgba(160, 64, 0, .8)',
                        'rgba(179, 182, 183, .8)',
                        'rgba(20, 143, 119, .8)',
                        'rgba(97, 106, 107, .8)',
                        'rgba(118, 68, 138, .8)',
                        'rgba(46, 64, 83, .8)',
                        'rgba(175, 96, 26, .8)'
                    ]
                }
            ]
        };
        var chartOptions = {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    display: false,
                    ticks: {
                        min: 0
                    }
                }]
            }
        };

        return (
            <div className="row">
                <div className="col-lg-4 form-group form-padding max-800">
                    <h2>{title}</h2>
                    <p>
                        {description}
                    </p>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        );
    }
}

PollChart.propTypes = {
    pollData: PropTypes.any
}

export default PollChart;
