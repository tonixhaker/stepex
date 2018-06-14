import React, {Component, Fragment} from 'react';
import { Input, Row, Col,Select,Button } from 'antd';
import {connect} from "react-redux";
import {getTranslate, setFromLang, setToLang, setFromText, getLangsList} from "../store/translator/actions";

const { TextArea } = Input;
const Option = Select.Option;

class Translator extends Component{

    constructor(props) {
        super(props);
        this.state = {
            swap: false
        };
    }


    componentDidMount(){
        //this.props.getLangsList();
    }


    tryTranslate(){
        this.props.getTranslate();
    }

    from_language_change(value){
        this.props.setFromLang(value);
        if(value === 'auto'){
            this.setState({swap:false});
        }else{
            this.setState({swap:true});
        }
    }

    to_language_change(value){
        this.props.setToLang(value);
    }

    from_text_change(text){
        this.props.setFromText(text.target.value);
    }

    switch_languages(){
        console.log('ok');
        let from = this.props.from_lang;
        let to = this.props.to_lang
        this.props.setToLang(from);
        this.props.setFromLang(to);
    }

    render (){
        return(
            <Fragment>
                <h1 className={'trans-center-text'}>Translator</h1>
                <Row className={'trans-container'}>
                    <Col span={7} offset={4} className={'centerv'}>
                        <div>
                            <h3 className={'trans-float-left trans-no-top-margin'}>From</h3>
                            <Select className={'trans-float-right'} value={this.props.from_lang} style={{ width: 200 }} onChange={(value) => this.from_language_change(value)}>
                                <Option value="auto">Auto</Option>
                                {

                                    Object.keys(this.props.langs).map(function(key, index) {
                                        return (
                                            <Option key={index} value={key}>{this.props.langs[key]}</Option>
                                        );
                                }.bind(this))}
                            </Select>
                        </div>
                        <TextArea rows={10} value={this.props.from_text} onChange={(value) => this.from_text_change(value)} />
                    </Col>
                    <Col span={2} className={'centerh'}>
                        <div className={'centerv'}>
                            <Button type="primary" size={'large'} shape="circle" icon="swap" disabled={!this.state.swap}  onClick={()=>this.switch_languages()}/>
                        </div>
                    </Col>
                    <Col span={7}>
                        <div>
                            <h3 className={'trans-float-left trans-no-top-margin'}>To</h3>
                            <Select className={'trans-float-right'} value={this.props.to_lang} style={{ width: 200 }} onChange={(value) => this.to_language_change(value)}>
                                {
                                    Object.keys(this.props.langs).map(function(key, index) {
                                        return (
                                            <Option key={index} value={key}>{this.props.langs[key]}</Option>
                                        );
                                    }.bind(this))}
                            </Select>
                        </div>
                        <TextArea rows={10} value={this.props.to_text} />
                    </Col>
                </Row>
                <Row>
                    <Col span={4} offset={10} className={'centerv trans-margintop50'}>
                        <Button type="primary" size={'large'} disabled={this.props.from_text.length==0} onClick={() => this.tryTranslate()}>Translate</Button>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    return{
        from_lang:state.translator.from_lang,
        to_lang:state.translator.to_lang,
        from_text:state.translator.from_text,
        to_text:state.translator.to_text,
        langs:state.translator.langs
    }
}

const mapDispatchToProps = dispatch => ({
    getTranslate: () => dispatch(getTranslate()),
    setFromLang: (lang) => dispatch(setFromLang(lang)),
    setToLang: (lang) => dispatch(setToLang(lang)),
    setFromText: (text) => dispatch(setFromText(text)),
    getLangsList: () => dispatch(getLangsList())
});


export default connect(mapStateToProps,mapDispatchToProps)(Translator);