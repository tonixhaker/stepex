import React, {Component, Fragment} from 'react';
import { Input, Row, Col,Select,Button } from 'antd';

const { TextArea } = Input;
const Option = Select.Option;

class Translator extends Component{
    render (){
        return(
            <Fragment>
                <h1 className={'trans-center-text'}>Translator</h1>
                <Row className={'trans-container'}>
                    <Col span={6} offset={5} className={'centerv'}>
                        <div>
                            <h3 className={'trans-float-left trans-no-top-margin'}>From</h3>
                            <Select className={'trans-float-right'} defaultValue="Auto" style={{ width: 200 }} onChange={(value) => console.log(value)}>
                                <Option value="auto">Auto</Option>
                                <Option value="eng">English</Option>
                                <Option value="ru">Russian</Option>
                                <Option value="ukr">Ukrainian</Option>
                            </Select>
                        </div>
                        <TextArea rows={4} />
                    </Col>
                    <Col span={2} className={'centerh'}>
                        <div className={'centerv'}>
                            <Button type="primary" size={'large'} shape="circle" icon="swap" disabled={true} />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div>
                            <h3 className={'trans-float-left trans-no-top-margin'}>To</h3>
                            <Select className={'trans-float-right'} defaultValue="English" style={{ width: 200 }} onChange={(value) => console.log(value)}>
                                <Option value="eng">English</Option>
                                <Option value="ru">Russian</Option>
                                <Option value="ukr">Ukrainian</Option>
                            </Select>
                        </div>
                        <TextArea rows={4} />
                    </Col>
                </Row>
                <Row>
                    <Col span={4} offset={10} className={'centerv trans-margintop50'}>
                        <Button type="primary" size={'large'}>Translate</Button>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Translator;