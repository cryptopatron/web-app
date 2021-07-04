import { createContext } from 'react';

export type userContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    token: string | null
    setToken: (token) => void
    publicKey: string;
    setPublicKey: (publicKey) => void;
}

const UserContext = createContext<userContextType>({isLoggedIn:false, setIsLoggedIn:()=>{}, token:"string", setToken:()=>{}, publicKey: '', setPublicKey:() => {}});
export default UserContext;