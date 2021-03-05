import React from 'react';

const CategoryForm = ({ handleSubmit, name, setName }) => {
    return (
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
                    <button className="btn btn-outline-primary">Save</button>
                </div>
            </div>
        </form>
    );
};

export default CategoryForm;
