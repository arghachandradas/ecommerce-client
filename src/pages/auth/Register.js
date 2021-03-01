import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Register = ({ history }) => {
    const [email, setEmail] = useState('');

    // required for protected route functionality
    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
        // if logged in, then user NOT allowed to access route for /register (i.e. this page)
        if (user && user.token) {
            history.push('/');
        }
        // eslint-disable-next-line
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Logged the user with email link only (passwordless authentication from firebase)
        const config = {
            // URL you want to redirect back to after clicking email link
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
            `Email is sent to ${email}. Click the link to complete your registration`
        );

        //Save the email to local storage
        window.localStorage.setItem('emailForRegistration', email);
        // clear email field
        setEmail('');
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 card p-4">
                    <h4 className="text-center">Register Form</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <br />
                        <button
                            type="submit"
                            className="btn btn-raised btn-success"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
