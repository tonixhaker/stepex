import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import User from '../containers/User';

import Words from '../containers/Words';
import Statistic from '../containers/Statistic';
import Translator from '../containers/Translator';
import LearnNewWords from '../containers/LearnNewWords';
import Test from '../containers/Test';
import Sidebar from './sidebar'
const { Content, Footer, Sider } = Layout;

class Logged extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sidebar />
                    <Layout className={'main_content_block_layout'}>
                        <Content style={{ margin: '0 16px' }}>

                                <Switch>
                                    <Route path="/user" component={User} />
                                    <Route path="/words" component={Words} />
                                    <Route path="/statistic" component={Statistic} />
                                    <Route path="/translator" component={Translator} />
                                    <Route path="/learn_words" component={LearnNewWords} />
                                    <Route path="/test" component={Test} />
                                </Switch>

                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                           EasyEnglish ©2018
                        </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}
export default Logged;