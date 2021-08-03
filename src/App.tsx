import UserContext from "./contexts/user"
import LoggedInUserContext, { defaultCreator } from './contexts/logged-in-user';
import useToken from './hooks/useToken';
import useWallet from './hooks/useWallet'
import { useState } from 'react';
import { Creator } from './constants/models';
import Router from "./router";

function App() {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [user, setUser] = useState<Creator>(defaultCreator)
    const {wallet, setWallet} = useWallet();
    const {token, setToken} = useToken();
    const [accessToken, setAccessToken] = useState('');
    return (
        <UserContext.Provider value={{ isAuth, setIsAuth, token, setToken, accessToken, setAccessToken, wallet, setWallet }}>
            <LoggedInUserContext.Provider value={{ user, setUser }}>
                <Router/>
            </LoggedInUserContext.Provider>
        </UserContext.Provider>
    );
}

export default App;