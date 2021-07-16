import { createContext } from 'react';

import { Creator } from '../constants/models';

export type loggedInUserContextType = {
    user: Creator
    setUser: (user: Creator) => void

}

export const defaultCreator = {
    email: "divyanshu@gmail.com",
    name: "Divyanshu",
    pageName: "rampage",
    generatedMaticWalletPublicKey: "0x7675289Fbd414acAE84752Bd789483a44B2d1576",
    metaMaskWalletPublicKey: "0x7675289Fbd414acAE84752Bd789483a44B2d1576",
    bio: "Really famous on Tiktok",
}

const LoggedInUserContext = createContext<loggedInUserContextType>({user: defaultCreator, setUser:()=>{}});
export default LoggedInUserContext;