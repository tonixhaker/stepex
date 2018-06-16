import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {nextWord,checkWord} from '../store/test/actions';
import { Button } from 'antd';
import axios from 'axios';

class LearnNewWords extends Component{

    constructor(props){
        super(props);
        this.state = {
            show_word_info: false,
        };
    }

    componentDidMount(){
        this.props.nextWord(this.props.uid);
    }

    answer2(v){
        this.props.checkWord(this.props.uid, v);
        console.log(this.props.previous_answer_status);
    }

    answer(v){
        axios.post('/api/check_word', {'uid':this.props.uid, 'answer':v})
            .then((res) => {
                if(res.data.previous_answer_status === 'success'){
                    this.props.nextWord(this.props.uid);
                }
                else{
                    this.setState({ show_word_info: true });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    start_test(){
        axios.post('/api/start_test', {'uid':this.props.uid})
            .then((res) => {
                if(res.data.status === 'success'){
                    this.props.nextWord(this.props.uid);
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
            <div>
            {this.props.user_status == 'test'?
                    <div>
                        { this.state.show_word_info?
                                <div>
                                    {this.props.word.ru}
                                </div>
                            :
                                <div>
                                    <h1 className={'word_title'}>{this.props.word.eng} [<i>{this.props.word.transcription}</i>]</h1>
                                    {this.props.fakes.map((v, i) => {
                                        return (
                                            <Button onClick={() => this.answer(v)}>{v}</Button>
                                        );
                                    })}
                                </div>
                        }
                    </div>
                :
                <Button onClick={() => this.start_test()} size={'large'}>Start test</Button>
            }
                {this.props.count<=1?
                <div>Percent:{this.props.percent}</div>
                    :
                    ''
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        word:state.test.word,
        fakes:state.test.fakes,
        uid:state.user.item.uid,
        previous_answer_status:state.test.previous_answer_status,
        user_status:state.test.user_status,
        percent:state.test.percent,
        count:state.test.count
    }
}

const mapDispatchToProps = dispatch => ({
    nextWord: (uid) => dispatch(nextWord(uid)),
    checkWord: (uid,answer) => dispatch(checkWord(uid,answer))
});


export default connect(mapStateToProps,mapDispatchToProps)(LearnNewWords);