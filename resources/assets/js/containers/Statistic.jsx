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
                <div>
                    
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