import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
    HomeOutlined,
    SettingOutlined,
    LoginOutlined,
    UserAddOutlined,
} from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Header = () => {
    // eslint-disable-next-line
    const [current, setCurrent] = useState('home');

    const handleClick = (e) => {
        setCurrent(e.key);
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
            </SubMenu>
        </Menu>
    );
};

export default Header;
