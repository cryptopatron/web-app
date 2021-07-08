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
    generatedMaticWalletPublicKey: "0x31470a0A76593D7b1FeF56D8093D8a6E660Ca102",
    metaMaskWalletPublicKey: "0x31470a0A76593D7b1FeF56D8093D8a6E660Ca102",
    bio: "Really famous on Tiktok",
}

const LoggedInUserContext = createContext<loggedInUserContextType>({user: defaultCreator, setUser:()=>{}});
export default LoggedInUserContext;