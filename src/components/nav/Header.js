import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import {
    HomeOutlined,
    SettingOutlined,
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');
    let dispatch = useDispatch();
    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    const logout = () => {
        auth.signOut();
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });

        // redirect to login page
        history.push('/login');
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>
            <Item
                key="register"
                icon={<UserAddOutlined />}
                className="float-right"
            >
                <Link to="/register">Register</Link>
            </Item>
            <Item key="login" icon={<LoginOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<LogoutOutlined />} onClick={logout}>
                    Logout
                </Item>
            </SubMenu>
        </Menu>
    );
};

export default Header;
