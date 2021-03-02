// use to project routes for unauthorized users
// WHICHEVER ROUTE IS ENCLOSED WITHIN THIS USERROUTE, IS PROTECTED(ACCESSIBLE) FOR SUBSCRIBER(LOGGED IN) USER ONLY
import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));

    // if we have auth user, then only we can access the route, whereever this "UserRoute" is applied
    return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
