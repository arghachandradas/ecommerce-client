// WHICHEVER ROUTE IS ENCLOSED WITHIN THIS ADMINROUTE, IS PROTECTED(ACCESSIBLE) FOR ADMIN(LOGGED IN) USER ONLY
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false); // flag for admin or not

    useEffect(() => {
        // if user logged in, then check admin or not
        if (user && user.token) {
            // this will go and pass through admin check middleware
            currentAdmin(user.token)
                .then((res) => {
                    // response is the current admin user from backend
                    console.log('CURRENT ADMIN RESPONSE TO FRONTEND', res);
                    setOk(true);
                })
                .catch((err) => {
                    console.log('ADMIN ROUTE ERROR', err);
                    setOk(false);
                });
        }
    }, [user]);

    // if we have auth user, then only we can access the route, whereever this "AdminRoute" is applied
    return ok ? (
        <Route {...rest} render={() => children} />
    ) : (
        <LoadingToRedirect />
    );
};

export default AdminRoute;
