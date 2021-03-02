import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';
import History from './pages/user/History';

// protected routes import
import AdminRoute from './components/routes/AdminRoute';
import UserRoute from './components/routes/UserRoute';

import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth status
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // if user logged in
                const idTokenResult = await user.getIdTokenResult();
                // getting current user on refresh from own database
                currentUser(idTokenResult.token)
                    .then((res) => {
                        const { email, name, role, _id } = res.data;
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                email,
                                name,
                                role,
                                _id,
                                token: idTokenResult.token,
                            },
                        });
                    })
                    .catch((err) => console.log(err));
            }
        });

        // cleanUp Memory Leaks
        return () => unsubscribe();
    }, [dispatch]);
    return (
        <>
            <Header />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route
                    exact
                    path="/register/complete"
                    component={RegisterComplete}
                />
                <Route
                    exact
                    path="/forgot/password"
                    component={ForgotPassword}
                />
                {/* protected routes */}
                <UserRoute exact path="/user/history" component={History} />
                <UserRoute exact path="/user/password" component={Password} />
                <UserRoute exact path="/user/wishlist" component={Wishlist} />
                <AdminRoute
                    exact
                    path="/admin/dashboard"
                    component={AdminDashboard}
                />
            </Switch>
        </>
    );
};

export default App;
