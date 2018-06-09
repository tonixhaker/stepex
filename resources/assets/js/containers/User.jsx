import React, {Component} from 'react';
import {connect} from "react-redux";

import {test, getItem} from '../store/user/actions'

class User extends Component{
    componentDidMount(){
        this.props.getItem();
    }

    render (){
        console.log(this.props.user.id);
        return(
            <div>
                USER {this.props.user.id}
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
    getItem: () => dispatch(getItem())
});

export default connect(mapStateToProps,mapDispatchToProps)(User);