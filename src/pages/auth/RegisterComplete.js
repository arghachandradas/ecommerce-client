import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState(
        window.localStorage.getItem('emailForRegistration')
    );
    const [password, setPassword] = useState('');

    let dispatch = useDispatch();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if (!email || !password) {
            toast.error('Email and Password is required');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be atleast 6 characters long');
            return;
        }
        try {
            // PASSWORDLESS AUTHENTICATION (New user saved to firebase DB)
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );

            if (result.user.emailVerified) {
                // update user with password
                // remove user email from local storage
                window.localStorage.removeItem('emailForRegistration');
                // get currently logged in user
                let user = auth.currentUser;
                // update this currently logged in users password
                await user.updatePassword(password);
                // get userID token (JWT)
                const idTokenResult = await user.getIdTokenResult();
                // passing token to backend and getting the user response from OWN SERVER
                createOrUpdateUser(idTokenResult.token)
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
                    .catch();

                // Redirect
                history.push('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 card p-4">
                    <h4 className="text-center">Complete Registration Form</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="btn btn-raised btn-success"
                        >
                            Complete Registration
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;
