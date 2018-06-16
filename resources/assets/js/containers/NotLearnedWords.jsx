import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {setPagination, getItems, setFilters, learnWord} from '../store/words/actions';
import { Table, Input, Popconfirm, Button } from 'antd';

class LearnedWords extends Component{
    componentDidMount(){
        this.props.getItems({'uid':this.props.uid});
    }

    onChange(page){
        this.props.setPagination(page);
        this.props.getItems({'uid':this.props.uid});
    }

    setFilters(value){
        this.props.setFilters({'search':value});
        this.props.getItems({'uid':this.props.uid});
    }

    learnWord(record){
        this.props.learnWord(record.id, this.props.uid);
        this.props.getItems({'uid':this.props.uid});
        console.log(record);
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
                    <Popconfirm title="Add this word to learned?" onConfirm={()=>this.learnWord(record)}  okText="Yes" cancelText="No">
                        <Button type={"primary"}>To Learned</Button>
                    </Popconfirm>
                );
            }
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
    setPagination:(data) => dispatch(setPagination(data)),
    getItems:(data) => dispatch(getItems(data)),
    setFilters: (data) => dispatch(setFilters(data)),
    learnWord: (word, user) => dispatch(learnWord(word, user))
});


export default connect(mapStateToProps, mapDispatchToProps)(LearnedWords);