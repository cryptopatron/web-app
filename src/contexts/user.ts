import { createContext } from 'react';

export type userContextType = {
    isAuth: boolean;
    setIsAuth: (isLoggedIn: boolean) => void;
    token: string | null
    setToken: (token) => void
    accessToken: string;
    setAccessToken: (accessToken) => void;
}

const UserContext = createContext<userContextType>({isAuth:false, setIsAuth:()=>{}, token:"string", setToken:()=>{}, accessToken:'', setAccessToken:() => {}});
export default UserContext;