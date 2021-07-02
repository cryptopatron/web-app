import { useEffect, useState } from 'react';

export default function useToken({ isLoggedIn }) {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        return tokenString
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    useEffect(() => {
        const listener = () => {
            // on logout remove token
            if (!isLoggedIn) {
                localStorage.removeItem('token')
            }

        }

        return () => {
            listener()
        }
    }, [isLoggedIn])

    return {
        setToken: saveToken,
        token
    }
}