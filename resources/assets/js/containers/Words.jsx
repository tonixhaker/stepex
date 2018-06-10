import React, {Component} from 'react';
import { Tabs } from 'antd';
import LearnedWords from './LearnedWords';
import NotLearnedWords from './NotLearnedWords';

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class Words extends Component{
    render (){
        return(
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Already learned" key="1"><LearnedWords /></TabPane>
                <TabPane tab="Not learned" key="2"><NotLearnedWords /></TabPane>
            </Tabs>
        );
    }
}

export default Words;