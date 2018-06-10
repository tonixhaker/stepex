import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {connect} from "react-redux";


class WordsLearned extends Component {

    render() {
        let data = {
            labels: [
                'Learned words',
                'Not Learned words'
            ],
            datasets: [{
                data: [this.props.rating.words_count,this.props.rating.total_words_count - this.props.rating.words_count],
                backgroundColor: [
                    '#00eb14',
                    '#000cff',
                ]
            }]
        };

        let headerStyle = {
            textAlign: 'center'
        };

        return (
            <div>
                <h2 style={headerStyle}>Learned words</h2>
                <Doughnut data={data} />
            </div>
        );
    }
}

export default connect()(WordsLearned);