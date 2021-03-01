// use to project routes for unauthorized users
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

const UserRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));

    return user && user.token ? (
        <Route {...rest} render={() => children} />
    ) : (
        <div className="d-flex justify-content-center align-items-center">
            <Spin size="large" />
        </div>
    );
};

export default UserRoute;
