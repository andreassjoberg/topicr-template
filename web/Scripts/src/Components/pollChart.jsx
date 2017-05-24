import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

class PollChart extends React.Component {
    render() {
        const { alternatives } = this.props.pollData;
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
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ]
                }
            ]
        };
        var chartOptions = {
        };

        return (
            <div className="row">
                <div className="col-lg-4 form-group max-800">
                    <Pie data={chartData} options={chartOptions} />
                </div>
            </div>
        );
    }
}

PollChart.propTypes = {
    pollData: PropTypes.any
}

export default PollChart;