import { createContext } from 'react';

export type userContextType = {
    isAuth: boolean;
    setIsAuth: (isLoggedIn: boolean) => void;
    token: string | null
    setToken: (token) => void
    accessToken: string;
    setAccessToken: (accessToken) => void;
    wallet: wallet;
    setWallet: (arg: wallet) => void
}

type wallet = {
    wallet:string,
    address:string
}

const defaultWallet = {
    wallet: "",
    address: ""
}

const UserContext = createContext<userContextType>({isAuth:false, setIsAuth:()=>{}, token:"string", setToken:()=>{}, accessToken:'', setAccessToken:() => {}, wallet:defaultWallet, setWallet:()=>{} });
export default UserContext;