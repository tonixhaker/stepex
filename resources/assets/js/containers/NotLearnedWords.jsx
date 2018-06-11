import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {setPagination, getItems, setFilters} from '../store/words/actions';
import { Table, Input } from 'antd';

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
                        onSearch={value => this.setFilters(value)}
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
    setPagination:(data) => dispatch(setPagination(data)),
    getItems:(data) => dispatch(getItems(data)),
    setFilters: (data) => dispatch(setFilters(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(LearnedWords);