import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import {connect} from "react-redux";


class Answers extends Component {

    render() {
        let data = {
            labels: [
                'Wrong answers',
                'Right answers'
            ],
            datasets: [{
                data: [this.props.rating.false_answers,this.props.rating.true_answers],
                backgroundColor: [
                    '#eb0003',
                    '#09ff04',
                ]
            }]
        };

        let headerStyle = {
            textAlign: 'center'
        };

        return (
            <div>
                <h2 style={headerStyle}>Answers</h2>
                <Pie data={data} />
            </div>
        );
    }
}

export default connect()(Answers);