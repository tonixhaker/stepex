import React, {Component} from 'react';
import {connect} from "react-redux";
import {getLearnedWords} from '../store/words/actions';
import { Table } from 'antd';

class LearnedWords extends Component{
    componentDidMount(){
        this.props.getLearnedWords(this.props.uid);
        console.log(this.props.words);
    }

    render (){

        const columns = [{
            title: 'English',
            dataIndex: 'eng',
            key: 'eng',
        }, {
            title: 'Transcription',
            dataIndex: 'transcription',
            key: 'transcription',
        }, {
            title: 'Russian',
            dataIndex: 'ru',
            key: 'ru',
        }];

        const subcolumns = [{
            title: 'English',
            dataIndex: 'ru',
            key: 'ru',
        },{
            title: 'Russian',
            dataIndex: 'eng',
            key: 'eng',
        }];


        return(
            <Table
                dataSource={this.props.words.data}
                expandRowByClick={true}
                expandedRowRender={record => <Table dataSource={record.examples} pagination={false} columns={subcolumns} />}
                columns={columns} />
        );
    }
}

function mapStateToProps(state){
    return{
        uid:state.words.uid,
        words:state.words.words
    }
}
const mapDispatchToProps = dispatch => ({
    getLearnedWords: (uid) => dispatch(getLearnedWords(uid))
});


export default connect(mapStateToProps, mapDispatchToProps)(LearnedWords);