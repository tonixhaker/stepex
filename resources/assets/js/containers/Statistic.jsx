import React, {Component} from 'react';
import {connect} from "react-redux";
import {getItem, test} from "../store/statistic/actions";

class Statistic extends Component{
    componentDidMount(){
        this.props.getItem(this.props.user.uid);
        console.log(this.props.user.uid);
    }
    render (){
        return(
            <div>
                STATISTIC
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user:state.user.item
    }
}

const mapDispatchToProps = dispatch => ({
    test: () => dispatch(test()),
    getItem: (uid) => dispatch(getItem(uid))
});


export default connect(mapStateToProps,mapDispatchToProps)(Statistic);