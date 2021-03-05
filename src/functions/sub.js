import axios from 'axios';

export const getSubs = async () =>
    await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSub = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
};

export const removeSub = async (slug, authtoken) => {
    // token required as we only allow user to delete if they are ADMIN
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
            authtoken,
        },
    });
};

export const updateSub = async (slug, sub, authtoken) => {
    // token required as we only allow user to delete if they are ADMIN
    return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
        headers: {
            authtoken,
        },
    });
};

export const createSub = async (sub, authtoken) => {
    // token required as we only allow user to delete if they are ADMIN
    return await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
        headers: {
            authtoken,
        },
    });
};
