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
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    // searching/filtering
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategories();
        // eslint-disable-next-line
    }, []);

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
                    loadCategories(); // loading all categories so that UI updated instantly
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
                setLoading(false);
                setName('');
                loadCategories(); // loading all categories so that UI updated instantly
                toast.success(`${res.data.name} is created.`);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    // used for filter
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                        />
                    </div>
                    <LocalSearch setKeyword={setKeyword} keyword={keyword} />
                    <br />
                    <div className="col-12 mt-4">
                        {categories
                            .filter(searched(keyword))
                            .map((category) => (
                                <div
                                    className="alert alert-secondary"
                                    key={category._id}
                                >
                                    {category.name}{' '}
                                    <span
                                        onClick={() =>
                                            handleRemove(category.slug)
                                        }
                                        className="btn btn-sm float-right"
                                    >
                                        <DeleteFilled className="text-danger" />
                                    </span>{' '}
                                    <Link
                                        to={`/admin/category/${category.slug}`}
                                    >
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
