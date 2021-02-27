import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Space, Spin } from 'antd';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        // signin with Email and Password
        try {
            const result = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            setLoading(false);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token,
                },
            });
            history.push('/');
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 card p-4">
                    <h4 className="text-center">Login Form</h4>
                    <form>
                        {loading ? (
                            <div className="text-center">
                                <Spin size="large" />
                            </div>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        placeholder="Enter Email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        autoFocus
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        placeholder="Enter Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>{' '}
                            </>
                        )}
                        <br />
                        <Button
                            type="primary"
                            shape="round"
                            icon={<MailOutlined />}
                            className="mb-3"
                            block
                            size="large"
                            onClick={handleSubmit}
                            disabled={!email || password.length < 6}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
