import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import User from '../containers/User';

import Words from '../containers/Words';
import Statistic from '../containers/Statistic';
import Translator from '../containers/Translator';
import Sidebar from './sidebar'
const { Content, Footer, Sider } = Layout;

class Logged extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sidebar />
                    {/*<Sider>*/}
                        {/*<div className={"logo"} />*/}
                        {/*<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">*/}
                            {/*<Menu.Item key="1">*/}
                                {/*<Link to='/user'>*/}
                                    {/*<Icon type="idcard" />*/}
                                    {/*<span>User Info</span>*/}
                                {/*</Link>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="2">*/}
                                {/*<Link to='/statistic'>*/}
                                    {/*<Icon type="pie-chart" />*/}
                                    {/*<span>Statistic</span>*/}
                                {/*</Link>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="3">*/}
                                {/*<Link to='/words'>*/}
                                    {/*<Icon type="bars" />*/}
                                    {/*<span>Words</span>*/}
                                {/*</Link>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="4">*/}
                                {/*<Link to="/translator">*/}
                                    {/*<Icon type="retweet" />*/}
                                    {/*<span>Translator</span>*/}
                                {/*</Link>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="5" className={"logout_button"}>*/}
                                {/*<a href="/logout">*/}
                                    {/*<Icon type="logout" />*/}
                                    {/*<span>Logout</span>*/}
                                {/*</a>*/}
                            {/*</Menu.Item>*/}
                        {/*</Menu>*/}
                    {/*</Sider>*/}
                    <Layout className={'main_content_block_layout'}>
                        <Content style={{ margin: '0 16px' }}>

                                <Switch>
                                    <Route path="/user" component={User} />
                                    <Route path="/words" component={Words} />
                                    <Route path="/statistic" component={Statistic} />
                                    <Route path="/translator" component={Translator} />
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