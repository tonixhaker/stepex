import React, {Fragment} from 'react';
import { Layout, Menu, Icon } from 'antd';
import {withRouter, Link} from 'react-router-dom';

const { Content, Footer, Sider } = Layout;
const nav = [
    {
        to: '/user',
        name: 'user-info',
        icon: 'idcard',
        title: 'User Info'
    },
    {
        to: '/statistic',
        name: 'statistic',
        icon: 'pie-chart',
        title: 'Statistic'
    },
    {
        to: '/words',
        name: 'words',
        icon: 'bars',
        title: 'Words'
    },
    {
        to: '/translator',
        name: 'translator',
        icon: 'retweet',
        title: 'Translator'
    },
    {
        to: '/user',
        name: 'user-info',
        icon: 'idcard',
        title: 'User Info'
    },

];

class Logged extends React.Component {

    getSelectedItem() {
        const {pathname} = this.props.location;
        let keys = [];
        let i = nav.findIndex((val) => val.to === pathname);
        keys.push('' + i);
        console.log(keys);
        return keys;
    };

    render() {
        return (
            <Sider>
                <div className={"logo"} />
                <Menu theme="dark" defaultSelectedKeys={this.getSelectedItem()} mode="inline">

                    {nav.map((v, i) => {
                        return (
                            <Menu.Item key={i} id={`nav-item-${v.name}`}>
                                <Link to={v.to}>
                                    <Icon type={v.icon} />
                                    <span>{v.title}</span>
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </Sider>
        );
    }
}
export default withRouter(Logged);