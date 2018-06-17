import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getWord} from "../store/learn_new_words/actions";
import {learnWord} from '../store/words/actions';
import { Table, Button, Icon } from 'antd';

class LearnNewWords extends Component{

    constructor(props){
        super(props);
        this.state = {
            button_blocked: false,
        };
    }

    componentDidMount(){
        this.props.getWord(this.props.uid);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ button_blocked: false });
    }

    render (){

        const columns = [{
            title: 'English',
            dataIndex: 'eng',
            key: 'eng',
        }, {
            title: 'Russian',
            dataIndex: 'ru',
            key: 'ru',
        }];

        return(
            <div className={'centerv heigth90'}>
                <h1 className={'word_title'}>{this.props.word.eng} [{this.props.word.transcription}] - <i>{this.props.word.ru}</i></h1>
                <div className={'centerh marginbuttons'}>
                    <Button disabled={this.state.button_blocked} type="dashed" className={'marginright20'} size={'large'} onClick={() => {this.setState({ button_blocked: true }); this.props.learnWord(this.props.word.id,this.props.uid);this.props.getWord(this.props.uid);}}>Add to learned</Button>
                    <Button type="primary" size={'large'} onClick={()=>this.props.getWord(this.props.uid)}><Icon type="reload" /></Button>
                </div>
                {this.props.word.examples && this.props.word.examples.length>0?
                    <div className={'centerh'}>
                        <Table columns={columns} dataSource={this.props.word.examples} />
                    </div>
                    :
                    <div className={'centerh'}>
                        <h3>No Examples</h3>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        word:state.learn_new_words.word,
        uid:state.user.item.uid,
    }
}

const mapDispatchToProps = dispatch => ({
    getWord: (uid) => dispatch(getWord(uid)),
    learnWord: (word, user) => dispatch(learnWord(word, user))
});


export default connect(mapStateToProps,mapDispatchToProps)(LearnNewWords);