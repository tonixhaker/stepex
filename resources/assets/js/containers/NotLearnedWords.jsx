import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getNotLearnedWords, setPagination, getItems} from '../store/words/actions';
import { Table, Input } from 'antd';

class LearnedWords extends Component{
    componentDidMount(){
        this.props.getNotLearnedWords(this.props.uid);
        console.log(this.props.words);
    }

    onChange(page){
        this.props.setPagination(page);
        this.props.getItems({'uid':this.props.uid});
        console.log(page);
    }

    render (){

        const Search = Input.Search;

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
            <Fragment>
                <div className={'word_search_div'}>
                    <Search
                        placeholder="input search word or transcription"
                        enterButton="Search"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                </div>

                <Table
                    dataSource={this.props.words.data}
                    expandRowByClick={true}
                    bordered={true}
                    pagination={{ total:this.props.words.total, showSizeChanger:true, showQuickJumper:true }}
                    expandedRowRender={record => <Table dataSource={record.examples} size={'small'} pagination={false} columns={subcolumns} />}
                    columns={columns}
                    onChange={(page) => this.onChange(page)}
                />
            </Fragment>
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
    getNotLearnedWords: (uid) => dispatch(getNotLearnedWords(uid)),
    setPagination:(data) => dispatch(setPagination(data)),
    getItems:(data) => dispatch(getItems(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(LearnedWords);