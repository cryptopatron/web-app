import { useContext, useState } from 'react';
import * as ROUTES from './../../constants/routes';
import { Link } from 'react-router-dom';

import DropdownComponent from "../../components/dropdown"
import {notLoggedinContent, LoggedinContent} from './dropdown-content'

export default function NavbarComponent() {

    let [dropdown, setDropdown] = useState( notLoggedinContent)

    return (
        <header className="h-16 bg-white mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            koen
                            {/* <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" /> */}

                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">

                        <DropdownComponent dropdownContent={dropdown} />

                    </div>
                </div>
            </div>

        </header>

    )
}