import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {nextWord,checkWord} from '../store/test/actions';
import { Button, Table, Modal } from 'antd';
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

    collision_promise() {
        return new Promise((resolve, reject)=>{
            Modal.confirm({
                title: 'Test collision!',
                content: 'You probably started another test in different window, do you want override that test with new one?',
                onOk() {
                    resolve();
                },
                onCancel() {
                    reject();
                },
            });
        });
    }

    collision(){
        this.collision_promise().then(()=>{
            this.force_start();
        })
    }

    force_start(){
        axios.post('/api/start_test_force', {'uid':this.props.uid})
            .then((res) => {
                if(res.data.status === 'success'){
                    this.props.nextWord(this.props.uid);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    answer(v){
        axios.post('/api/check_word', {'uid':this.props.uid, 'answer':v, 'word_id':this.props.word.word_id})
            .then((res) => {
                if(res.data.previous_answer_status === 'success'){
                    this.props.nextWord(this.props.uid);
                }
                else{
                    this.setState({ show_word_info: true });
                }
            })
            .catch((err) => {
                console.log(err.response.status);
                if(err.response.status == 403){
                    this.collision();
                }
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
                if(err.response.status == 403){
                    this.collision();
                }
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
            <div className={'centerv heigth90'}>
                {this.props.count<=0 && this.props.percent!=null?
                    <h1 className={'word_title'}>Last result: {this.props.percent}% ({this.props.percent/10} from 10)</h1>
                    :
                    ''
                }
            {this.props.user_status == 'test'?
                    <div>
                        { this.state.show_word_info?
                            <div className={'centerv heigth90'}>
                                <h1 className={'word_title'}><i>Wrong answer, just remember this word</i></h1>
                                <h1 className={'word_title'}>{this.props.word.eng} [{this.props.word.transcription}] - <i>{this.props.word.ru}</i></h1>
                                <div className={'centerh marginbuttons'}>
                                <Button type="dashed" className={'marginright20'} size={'large'} onClick={() => { this.props.nextWord(this.props.uid); this.setState({ show_word_info: false }); }}>Got it</Button>
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
                            :
                            <div className={'centerv heigth90'}>
                                <div>
                                    <h1 className={'word_title'}>{this.props.word.eng} [<i>{this.props.word.transcription}</i>]</h1>
                                    <div className={'buttons_to_center'}>
                                        <div className={'test_button_container'}>
                                            {this.props.fakes.map((v, i) => {
                                                return (
                                                    <Button className={'test_button'} onClick={() => this.answer(v)}>{v}</Button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                :
                <Fragment>
                    {!this.props.not_enough_words?
                    <div className={'buttons_to_center'}>
                        <Button className={'test_buttons'} onClick={() => this.start_test()} size={'large'}><h2>Start test</h2></Button>
                    </div>
                        :
                    <h1 className={'word_title'}>Sorry, learn a few more words please (at least 10)</h1>
                     }
                </Fragment>
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
        count:state.test.count,
        not_enough_words:state.test.not_enough_words
    }
}

const mapDispatchToProps = dispatch => ({
    nextWord: (uid) => dispatch(nextWord(uid)),
    checkWord: (uid,answer) => dispatch(checkWord(uid,answer))
});


export default connect(mapStateToProps,mapDispatchToProps)(LearnNewWords);