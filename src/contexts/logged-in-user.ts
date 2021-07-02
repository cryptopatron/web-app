import { createContext } from 'react';

import { Creator } from '../constants/models';

export type loggedInUserContextType = {
    user: Creator
    setUser: (user: Creator) => void

}

export const creator = {
    email: "",
    name: "",
    pageName: "",
    generatedMaticWalletPublicKey: "",
    metaMaskWalletPublicKey: "",
    summary: "",
}

const LoggedInUserContext = createContext<loggedInUserContextType>({user: creator, setUser:()=>{}});
export default LoggedInUserContext;