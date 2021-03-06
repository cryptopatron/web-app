import { Menu, Transition } from '@headlessui/react';
import { Fragment, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/user';

export default function DropdownComponent({ dropdownContent }) {
    const history = useHistory()
    const {setToken, setWallet} = useContext(UserContext)

    const reroute = (content) =>{
        // id=4 for sign out
        if (content.id === 4) { 
            setToken(null)
            localStorage.removeItem("token")
            setWallet({wallet:"", address:""})
            localStorage.removeItem("wallet")
        }
        history.push(content.path)
    }
    return (
        <div className="text-right top-4 z-50">
            <Menu as="div" className="inline-block text-left">
                <div>
                    <Menu.Button >
                    <FontAwesomeIcon icon={faBars}/>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items as='ul' className="absolute right-8 w-32 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className=" py-1 ">

                            { dropdownContent.map((content, index) => { return (
                                <Menu.Item as='div'>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-primary-hover text-black' : 'text-gray-900'
                                                } group flex text-center items-center w-full px-2 py-2 text-sm focus:outline-none`}
                                            
                                                onClick={() => { reroute(content) }}
                                        >
                                            {/* {active ? (
                                                <EditActiveIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <EditInactiveIcon
                                                    className="w-5 h-5 mr-2"
                                                    aria-hidden="true"
                                                />
                                            )} */}
                                            {content.label}
                         
                                        </button>
                                    )}
                                </Menu.Item>)
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
