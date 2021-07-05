import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import ImageDefaultProfile1 from './../../../../assets/images/default_profile_1.svg';
import EditOverlayComponent from './edit-overlay';
import { randomPastelColourService } from '../../../../services/randomPastelColourService';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

export default function CreatorComponent({ creator, isLoggedIn }) {

    const [showOverlay, setShowOverlay] = useState(false)

    const profileBg = randomPastelColourService()

    const closeOverlay = () => {
        setShowOverlay(false)
    }

    const openOverlay = () => {
        setShowOverlay(true)
    }



    return ((!creator.pageName) ? (<Skeleton count={1} height={200} />) : (
        <div>

            {/* if profile pic is not present */}
            <div className="flex flex-col justify-center">
                <Link to={`/${creator.pageName}`} className="" >
                    <div className=" flex justify-center items-center w-full h-36 relative" style={{ background: `${profileBg[1]}` }} >
                        <div className=" flex mx-auto justify-center absolute top-16 w-32 h-32 rounded-full" style={{ background: `${profileBg[0]}` }}>
                            <img className="w-2/5 transform translate-y-3" src={ImageDefaultProfile1} alt="place_holder_image" />
                        </div>
                    </div>
                </Link>

                <div className="text-center mt-16 mb-4 font-medium">{(creator.name) ? creator.name : creator.pageName}</div>
                <div className="text-center mx-auto mt-18 font-light w-10/12">{creator.bio} <span>{(isLoggedIn) ? (<div className="cursor-pointer mx-auto text-xs font-light" onClick={() => { openOverlay() }}> <FontAwesomeIcon icon={faEdit}/> Edit Profile</div>) : (<></>)}</span></div>
                {/* TODO remove is true */}

            </div>

            <Transition appear show={showOverlay} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={setShowOverlay}
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
                            <div className="fixed flex justify-start mx-auto bottom-0 inset-x-0 w-full px-8 sm:px-4 p-4 sm:bottom-1/3 max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-t-2xl sm:rounded-2xl">

                                <EditOverlayComponent creator={creator} />
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

        </div>
    ))


}
