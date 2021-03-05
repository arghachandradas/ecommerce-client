import React from 'react';

const LocalSearch = ({ setKeyword, keyword }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };

    return (
        <input
            type="search"
            placeholder="Filter"
            value={keyword}
            onChange={handleSearch}
            className="form-control col-md-4 mb-4 mt-4"
            style={{ marginLeft: '15px' }}
        />
    );
};

export default LocalSearch;
