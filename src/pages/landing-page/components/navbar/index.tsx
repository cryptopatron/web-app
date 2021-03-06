import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/Logo(Latest).jpg';
import { Dialog, Transition } from '@headlessui/react'
import LoginOverlayComponent from './../login-overlay/'



export default function NavbarComponent({
    setToken,
    token,
    clickSignIn,
    closeModal,
    openModal,
    showLoginOverlay

}) {
    return (
        <>
            <nav className="h-14 bg-white my-3">
                <div className="container mx-auto max-w-screen-xl h-full">
                    <div className="flex justify-between h-full">
                        <div className="w-auto flex justify-start items-center mx-5">
                            <div>
                                <Link
                                    to="/"
                                >
                                    {/* <img src={logo} alt="Navbar Kōen logo" /> */}
                                </Link>
                            </div>
                            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer mx-2">
                                <span className="flex justify-center w-full font-title font-bold  text-4xl">
                                    Kōen
                                    {/* <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" /> */}

                                </span>
                            </div>
                        </div>

                        <div className="flex items-center mx-5">
                            <button
                                className="btn-main md:w-28"
                                onClick={() => {
                                    clickSignIn()
                                }}
                            >
                                <span>Sign In</span>
                            </button>
                        </div>
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
                            <div className="fixed flex justify-center mx-auto bottom-0 inset-x-0 w-full p-0 sm:bottom-1/3 max-w-2xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-2xl sm:rounded-2xl">

                                <LoginOverlayComponent setToken={setToken} />
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}