import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import {connect} from "react-redux";


class WordsLearned extends Component {

    render() {
        console.log(this.props.rating);
        let data = {
            labels: [
                'Users with higher rating',
                'Users with same rating',
                'Users with lower rating',
            ],
            datasets: [
                {
                    backgroundColor: [
                        '#908dff',
                        '#ff0c15',
                        '#0beb02',],
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [this.props.rating.users_smarter,this.props.rating.same_rating, this.props.rating.users_dumber]
                }
            ]
        };

        let headerStyle = {
            textAlign: 'center'
        };
        let options={
            legend: {
                display: false,
            },
        };
        return (
            <div>
                <h2 style={headerStyle}>Position in users rating</h2>
                <Bar data={data} options={options} />
            </div>
        );
    }
}

export default connect()(WordsLearned);