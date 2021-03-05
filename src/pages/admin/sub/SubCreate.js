import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { createSub, removeSub, getSubs } from '../../../functions/sub';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteFilled } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';
import { Select } from 'antd';

const SubCreate = () => {
    const { Option } = Select;
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]); // holds all categories
    const [subs, setSubs] = useState([]); // holds all sub categories
    const [category, setCategory] = useState(''); // what category user select
    // searching/filtering
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategories();
        loadSubs();
        // eslint-disable-next-line
    }, []);

    // GET ALL CATEGORIES
    const loadCategories = () =>
        getCategories(user.token).then((c) => {
            setCategories(c.data);
        });
    // GET ALL SUB CATEGORIES
    const loadSubs = () =>
        getSubs(user.token).then((s) => {
            setSubs(s.data);
        });

    // create sub category
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // CREATING CATEGORY
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false);
                setName('');
                loadSubs();
                toast.success(`${res.data.name} is created.`);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    // Delete sub category
    const handleRemove = async (slug) => {
        if (window.confirm('Delete ?')) {
            setLoading(true);
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    loadSubs();
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

    // used for filter
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <div className="col-md-10 offset-md-1 card p-2 mt-4">
                        {loading ? (
                            <div className="text-center">
                                <Spin size="large" />
                            </div>
                        ) : (
                            <h4 className="text-center">Create Sub Category</h4>
                        )}
                        <Select
                            defaultValue="select a category"
                            style={{ width: 200 }}
                            className="m-4"
                            onChange={handleCategoryChange}
                        >
                            <Option value="select a category" disabled>
                                select a category
                            </Option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {' '}
                                        {c.name}
                                    </Option>
                                ))}
                        </Select>
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                        />
                    </div>
                    <LocalSearch setKeyword={setKeyword} keyword={keyword} />
                    <br />
                    <div className="col-12 mt-4">
                        {subs.filter(searched(keyword)).map((s) => (
                            <div className="alert alert-secondary" key={s._id}>
                                {s.name}{' '}
                                <span
                                    onClick={() => handleRemove(s.slug)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteFilled className="text-danger" />
                                </span>{' '}
                                <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
