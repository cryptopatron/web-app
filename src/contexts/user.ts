import { createContext } from 'react';

import { Creator } from '../constants/models';

export type userContextType = {
    user: Creator
    setUser: (user: Creator) => void
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;

}

export const creator = {
    email: "",
    name: "",
    pageName: "",
    generatedMaticWalletPublicKey: "",
    metaMaskWalletPublicKey: "",
    summary: "",
}

const UserContext = createContext<userContextType>({user: creator, setUser:()=>{}, isLoggedIn:true, setIsLoggedIn:()=>{}});
export default UserContext;