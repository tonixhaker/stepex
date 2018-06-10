import React, {Component} from 'react';
import {connect} from "react-redux";
import {getNotLearnedWords} from '../store/words/actions';
import { Table } from 'antd';

class LearnedWords extends Component{
    componentDidMount(){
        this.props.getNotLearnedWords(this.props.uid);
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
            dataIndex: 'ru',
            key: 'ru',
        },{
            dataIndex: 'eng',
            key: 'eng',
        }];


        return(
            <Table
                dataSource={this.props.words.data}
                expandRowByClick={true}
                bordered={true}
                pagination={{ position: 'both', total:this.props.words.total, showSizeChanger:'true', showQuickJumper:'true' }}
                expandedRowRender={record => <Table dataSource={record.examples} size={'small'} pagination={false} columns={subcolumns} />}
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
    getNotLearnedWords: (uid) => dispatch(getNotLearnedWords(uid))
});


export default connect(mapStateToProps, mapDispatchToProps)(LearnedWords);