import React, {Component} from 'react';
import {connect} from "react-redux";
import Answers from '../components/graphics/pie';
import WordsLearned from '../components/graphics/words_learned';
import UsersCompare from '../components/graphics/user_compare'


import {getItem} from "../store/statistic/actions";

class Statistic extends Component{

    componentDidMount(){
        this.props.getItem(this.props.uid);
    }


    render (){
        return(
            <div className={"flex_row"}>
                <div>
                    <Answers rating={this.props.rating} />
                </div>
                <div>
                    <WordsLearned rating={this.props.rating} />
                </div>
                <div className={"fullsize"}>
                    <dl className="holiday">
                        <dt>{this.props.rating.totalrating}</dt>
                        <dd>GLobal rating</dd>

                        <dt>{this.props.rating.tests_count}</dt>
                        <dd>Tests passed</dd>

                        <dt>{this.props.rating.total_users_count - this.props.rating.users_dumber}</dt>
                        <dd>Position in rating list</dd>

                        <dt>{this.props.rating.total_users_count}</dt>
                        <dd>Total users count</dd>
                    </dl>
                </div>
                <div>
                    <UsersCompare rating={this.props.rating} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        uid:state.statistic.uid,
        rating:state.statistic.rating
    }
}

const mapDispatchToProps = dispatch => ({
    getItem: (uid) => dispatch(getItem(uid))
});


export default connect(mapStateToProps,mapDispatchToProps)(Statistic);