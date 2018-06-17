import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getItemsLearned, setPagination, setFilters, forgetWord} from '../store/words/actions';
import { Table,Input,Button,Popconfirm, message } from 'antd';
import axios from "axios/index";

class LearnedWords extends Component{
    componentDidMount(){
        this.props.getItemsLearned({'uid':this.props.uid});
    }

    onChange(page){
        this.props.setPagination(page);
        this.props.getItemsLearned({'uid':this.props.uid});
    }

    setFilters(value){
        this.props.setFilters({'search':value});
        this.props.getItemsLearned({'uid':this.props.uid});
    }

    forgetWord2(record){
        this.props.forgetWord(record.word_id,record.user_id);
        this.props.getItemsLearned({'uid':this.props.uid});
        //console.log(record);
    }

    forgetWord(record){
        axios.post('/api/forget_word', {'word_id':record.word_id, 'user_id':record.user_id})
            .then((res) => {
                this.props.getItemsLearned({'uid':this.props.uid});
            })
            .catch((err) => {
                console.log(err);
            });
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
        },{
            title: 'Manage',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            render: (text, record) => {
                return (
                    <Popconfirm title="Are you sure forget this word?" onConfirm={()=>this.forgetWord(record)}  okText="Yes" cancelText="No">
                        <Button type={"danger"}>Forget</Button>
                    </Popconfirm>
                );
            }
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
            <Fragment>
                <div className={'word_search_div'}>
                    <Search
                        placeholder="input search word or transcription"
                        enterButton="Search"
                        size="large"
                        onSearch={value => this.setFilters(value)}
                    />
                </div>
                <Table
                    dataSource={this.props.words.data}
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
    getItemsLearned: (uid) => dispatch(getItemsLearned(uid)),
    setPagination: (uid) => dispatch(setPagination(uid)),
    setFilters: (data) => dispatch(setFilters(data)),
    forgetWord: (word, user) => dispatch(forgetWord(word, user))
});


export default connect(mapStateToProps, mapDispatchToProps)(LearnedWords);