import React, {Component} from 'react';
import {connect} from "react-redux";
import Moment from 'react-moment';

import {test, getItem} from '../store/user/actions'

class User extends Component{
    componentDidMount(){
        this.props.getItem(this.props.user.uid);
    }

    createMarkup() { return {__html: `<script async src="https://telegram.org/js/telegram-widget.js?4" data-telegram-login="goosavebot" data-size="large" data-auth-url="/login" data-request-access="write"/>`}; };

    render (){
        return(
            <div className={'container'}>
                {this.props.user.photo_url ?
                    <img className={'user_img'} src={this.props.user.photo_url} alt="avatar"/>
                    :
                    <img className={'user_img2'} src={'/img/noavatar.png'} alt="avatar"/>
                }
                <h1 className={'username'}>{this.props.user.fname} {this.props.user.lname}</h1>
                <i>Using 'Easy English' since <Moment date={this.props.user.created_at} format="YYYY/MM/DD" /></i>
                <div dangerouslySetInnerHTML={this.createMarkup()} />
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