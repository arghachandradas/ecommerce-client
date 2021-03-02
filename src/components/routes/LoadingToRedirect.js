import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);

        // redirect once count = 0
        count === 0 && history.push('/');
        // cleanup
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [count]);
    return (
        <div className="container p-5 text-center">
            <h4>Redirecting you in {count} seconds ...</h4>
        </div>
    );
};

export default LoadingToRedirect;
