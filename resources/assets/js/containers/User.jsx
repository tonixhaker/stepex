import React, {Component} from 'react';
import {connect} from "react-redux";

import {test, getItem} from '../store/user/actions'

class User extends Component{
    componentDidMount(){
        this.props.getItem(this.props.user.uid);
    }



    render (){
        return(
            <div className={'container'}>
                <img className={'user_img'} src={this.props.user.photo_url} alt=""/>
                <h1 className={'username'}>{this.props.user.fname} {this.props.user.lname}</h1>
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

export default connect(mapStateToProps,mapDispatchToProps)(User);