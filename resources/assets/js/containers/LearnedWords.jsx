import React, {Component} from 'react';
import {connect} from "react-redux";
import {getLearnedWords, getItemsLearned, setPagination} from '../store/words/actions';
import { Table } from 'antd';

class LearnedWords extends Component{
    componentDidMount(){
        this.props.getLearnedWords(this.props.uid);
        console.log(this.props.words);
    }

    onChange(page){
        this.props.setPagination(page);
        this.props.getItemsLearned({'uid':this.props.uid});
        console.log(page);
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
                bordered={true}
                pagination={{ position: 'both', total:this.props.words.total, showSizeChanger:true, showQuickJumper:true }}
                expandedRowRender={record => <Table dataSource={record.examples} size={'small'} pagination={false} columns={subcolumns} />}
                columns={columns}
                onChange={(page) => this.onChange(page)}
            />
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
    getLearnedWords: (uid) => dispatch(getLearnedWords(uid)),
    getItemsLearned: (uid) => dispatch(getItemsLearned(uid)),
    setPagination: (uid) => dispatch(setPagination(uid))
});


export default connect(mapStateToProps, mapDispatchToProps)(LearnedWords);