import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { getSub, updateSub } from '../../../functions/sub';
import { Spin } from 'antd';
import CategoryForm from '../../../components/forms/CategoryForm';

const SubUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]); // holds all categories
    const [parent, setParent] = useState(''); // holds all sub categories

    useEffect(() => {
        loadCategories();
        loadSub();
        // eslint-disable-next-line
    }, []);

    // GET ALL CATEGORIES
    const loadCategories = () =>
        getCategories(user.token).then((c) => {
            setCategories(c.data);
        });
    // GET ALL SUB CATEGORIES
    const loadSub = () =>
        getSub(match.params.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        });

    // update sub category
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(parent);
        setLoading(true);
        // CREATING CATEGORY
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is updated.`);
                history.push('/admin/sub');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleCategoryChange = (e) => {
        setParent(e.target.value);
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
                            <h4 className="text-center">Update Sub Category</h4>
                        )}
                        <div className="form-group ml-4 mr-4">
                            <label htmlFor="parent">Parent Category</label>
                            <select
                                name="category"
                                className="form-control"
                                onChange={handleCategoryChange}
                            >
                                {categories.length &&
                                    categories.map((c) => (
                                        <option
                                            key={c._id}
                                            value={c._id}
                                            // eslint-disable-next-line
                                            selected={c._id === parent}
                                        >
                                            {c.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubUpdate;
