import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // required for protected route functionality
    const { user } = useSelector((state) => ({ ...state }));
    useEffect(() => {
        // if logged in, then user NOT allowed to access route for /forgot/password (i.e. this page)
        if (user && user.token) {
            history.push('/');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            // URL you want to redirect back to after user changed the old password
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        };
        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setLoading(false);
                setEmail('');
                toast.success('Check your email for password reset link');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
                console.log('FORGOT PASSWORD ERROR', error);
            });
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 card p-4">
                    {loading ? (
                        <div className="text-center">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <h4 className="text-center">Forgot Password</h4>
                    )}
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
                        <button className="btn btn-raised" disabled={!email}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
