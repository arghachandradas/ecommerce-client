import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
const { Item } = Menu;

const AdminNav = () => {
    return (
        <Menu style={{ width: 256 }} mode="vertical">
            <Item key="dashboard">
                <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
            <Item key="product">
                <Link to="/admin/product">Product</Link>
            </Item>
            <Item key="products">
                <Link to="/admin/products">Products</Link>
            </Item>
            <Item key="category">
                <Link to="/admin/category">Category</Link>
            </Item>
            <Item key="subCategory">
                <Link to="/admin/sub">Sub Category</Link>
            </Item>
            <Item key="coupon">
                <Link to="/admin/coupon">Coupon</Link>
            </Item>
            <Item key="password">
                <Link to="/user/password">Password</Link>
            </Item>
        </Menu>
    );
};

export default AdminNav;
