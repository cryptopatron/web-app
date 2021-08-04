import { createContext } from 'react';

import { Creator } from '../constants/models';

export type loggedInUserContextType = {
    user: Creator
    setUser: (user: Creator) => void

}

export const defaultCreator = {
    email: "",
    name: "",
    pageName: "",
    generatedMaticWalletPublicAddress: "",
    metaMaskWalletPublicAddress: "",
    bio: "",
}

const LoggedInUserContext = createContext<loggedInUserContextType>({user: defaultCreator, setUser:()=>{}});
export default LoggedInUserContext;