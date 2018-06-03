import React, {Fragment} from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route,} from 'react-router-dom';

import User from '../containers/User';
import Words from '../containers/Words';
import Statistic from '../containers/Statistic';

class Logged extends React.Component {
    render() {
        return (
            <Router>
            <Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider>
                        <div className={"logo"} />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1">
                                <Link to='/user'>
                                    <Icon type="idcard" />
                                    <span>User Info</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/statistic'>
                                    <Icon type="pie-chart" />
                                    <span>Statistic</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to='/words'>
                                    <Icon type="bars" />
                                    <span>Words</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4" className={"logout_button"}>
                                <a href="/logout">
                                    <Icon type="logout" />
                                    <span>Logout</span>
                                </a>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{ margin: '0 16px' }}>
                            <Route path="/user" component={User} />
                            <Route path="/words" component={Words} />
                            <Route path="/statistic" component={Statistic} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                           EasyEnglish ©2018
                        </Footer>
                    </Layout>
                </Layout>
            </Fragment>
            </Router>
        );
    }
}
export default Logged;