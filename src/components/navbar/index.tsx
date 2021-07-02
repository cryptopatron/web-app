import {useState } from 'react';


import DropdownComponent from "../../components/dropdown"
import {notLoggedinContent} from './dropdown-content'

export default function NavbarComponent() {

    let [dropdown, setDropdown] = useState(notLoggedinContent)

    return (
        <header className="h-14 bg-white mb-4">
            <div className="container mx-auto max-w-screen-xl h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer mx-8">
                        <h1 className="flex justify-center w-full">
                            koen
                            {/* <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" /> */}

                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items mx-8">

                        <DropdownComponent dropdownContent={dropdown} />

                    </div>
                </div>
            </div>

        </header>

    )
}