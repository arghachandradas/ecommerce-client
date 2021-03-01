import axios from 'axios';

// CREATE or UPDATE USER IN THE MONGODB DATABASE(not firebase)
export const createOrUpdateUser = async (authtoken) => {
    // sending req headers(token) to backend and sending empty body
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

// GET CURRENT LOGGED IN USER FROM MONGODB(not firebase)
export const currentUser = async (authtoken) => {
    // sending req headers(token) to backend and sending empty body
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};
