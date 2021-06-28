import { Fragment, useState } from 'react'
import logo from '../../../../assets/images/Logo(Latest).jpg';
import { Dialog, Transition } from '@headlessui/react'

import LoginOverlayComponent from './../login-overlay/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function NavbarComponent() {
    const [showLoginOverlay, setShowLoginOverlay] = useState(false);

    function closeModal() {
        setShowLoginOverlay(false)
      }
    
      function openModal() {
        setShowLoginOverlay(true)
      }

    return (
        <>
            <nav className="relative flex items-center justify-between px-2 py-3 bg-white mb-5">
                <div className="container px-4 mx-auto flex items-center justify-between">
                    <div className="w-auto relative flex justify-start static lg:block">
                        <a
                            className="leading-relaxedmr-4 py-2 whitespace-nowrap"
                            href="#pablo"
                        >
                            <img src={logo} alt="Navbar Kōen logo" />
                        </a>
                    </div>
                    <div className="items-center">
                        <ul className="ml-auto">
                            <li className="nav-item">
                                <button
                                    className="btn-main"
                                    onClick={() => {
                                        openModal()
                                    }}
                                >
                                    <span>Sign In</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Transition appear show={showLoginOverlay} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-0 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-50"
              leaveTo="opacity-0"
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 " />
            </Transition.Child>
            
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed mx-auto bottom-0 inset-x-0 w-full sm:bottom-1/3 sm:top-1/3 max-w-2xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-2xl sm:rounded-2xl">
                
                <LoginOverlayComponent/>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

        </>
    );
}