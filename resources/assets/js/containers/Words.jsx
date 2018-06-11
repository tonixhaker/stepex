import React, {Component} from 'react';
import { Tabs } from 'antd';
import LearnedWords from './LearnedWords';
import NotLearnedWords from './NotLearnedWords';
import {setFilters, getItems, getItemsLearned, setPagination} from '../store/words/actions';
import {connect} from "react-redux";

const TabPane = Tabs.TabPane;

class Words extends Component{

    dropFilter(key){
        this.props.setFilters({'search':""});
        this.props.setPagination({
            "current": 1,
            "pageSize": 10
        });
        switch (key){
            case "1":
                this.props.getItemsLearned({'uid':this.props.uid});
                break;
            case "2":
                this.props.getItems({'uid':this.props.uid});
                break;
            default:break;
        }
    }

    render (){
        return(
            <Tabs defaultActiveKey="1" onChange={(key) => this.dropFilter(key)}>
                <TabPane tab="Already learned" key="1"><LearnedWords /></TabPane>
                <TabPane tab="Not learned" key="2"><NotLearnedWords /></TabPane>
            </Tabs>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getItemsLearned: (uid) => dispatch(getItemsLearned(uid)),
    setFilters: (data) => dispatch(setFilters(data)),
    getItems:(data) => dispatch(getItems(data)),
    setPagination:(data) => dispatch(setPagination(data))
});

function mapStateToProps(state){
    return{
        uid:state.words.uid
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Words);