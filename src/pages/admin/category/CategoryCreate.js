import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    createCategory,
    getCategories,
    removeCategory,
} from '../../../functions/category';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';

const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
        // eslint-disable-next-line
    }, [categories]);

    // GET ALL CATEGORIES
    const loadCategories = () =>
        getCategories(user.token).then((c) => {
            setCategories(c.data);
        });

    const handleRemove = async (slug) => {
        if (window.confirm('Delete ?')) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} is deleted`);
                })
                .catch((err) => {
                    setLoading(false);
                    if (err.response.status === 400) {
                        toast.error(err.response.data);
                    }
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // CREATING CATEGORY
        createCategory({ name }, user.token)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is created.`);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col row">
                    <div className="col-md-10 offset-md-1 card p-2 mt-4">
                        {loading ? (
                            <div className="text-center">
                                <Spin size="large" />
                            </div>
                        ) : (
                            <h4 className="text-center">Create Category</h4>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group pl-4 pr-4">
                                <label>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                    required
                                />
                                <br />
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-outline-primary">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 mt-4">
                        {categories.map((category) => (
                            <div
                                className="alert alert-secondary"
                                key={category._id}
                            >
                                {category.name}{' '}
                                <span
                                    onClick={() => handleRemove(category.slug)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteFilled className="text-danger" />
                                </span>{' '}
                                <Link to={`/admin/category/${category.slug}`}>
                                    <span className="btn btn-sm float-right">
                                        <EditOutlined className="text-warning" />
                                    </span>{' '}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
