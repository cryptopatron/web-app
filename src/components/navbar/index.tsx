import { useState, useEffect, useContext } from 'react';

import DropdownComponent from "../../components/dropdown"
import {notLoggedinContent} from './dropdown-content'
import UserContext from '../../contexts/user';
import LoggedInUserContext from '../../contexts/logged-in-user';

export default function NavbarComponent({loggedInContent}) {

    let [dropdown, setDropdown] = useState(notLoggedinContent)
    const {user} = useContext(LoggedInUserContext)

    useEffect(() => {
        const listener = () =>{
            if(user.pageName){
                setDropdown(loggedInContent)
            }
            else{
                setDropdown(notLoggedinContent)
            }
        }

        listener()
        
    }, [user])
    return (
        <header className="h-14 bg-white">
            <div className="container mx-auto max-w-screen-xl h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer mx-8">
                       <a href="/">
                           <h1 className="flex justify-center w-full">
                            koen
                            {/* <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" /> */}
                            </h1>
                       </a>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items mx-8">

                        <DropdownComponent dropdownContent={dropdown} />

                    </div>
                </div>
            </div>

        </header>

    )
}