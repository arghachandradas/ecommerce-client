import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';
import { Spin } from 'antd';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategory();
        // eslint-disable-next-line
    }, []);

    // GET ALL CATEGORIES
    const loadCategory = () =>
        getCategory(match.params.slug).then((c) => {
            setName(c.data.name);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // CREATING CATEGORY
        updateCategory(match.params.slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is updated.`);
                history.push('/admin/category');
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
                            <h4 className="text-center">Update Category</h4>
                        )}

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

export default CategoryUpdate;
