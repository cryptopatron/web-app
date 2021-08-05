import * as React from "react"
import clsx from "clsx"
import { useRef } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

type ModalProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    full_details: any
}

function get_help_info(full_details) {
    return (<div className="my-8">
        <ul className="list-disc list-inside text-sm leading-8">
            <li><a href="https://medium.com/@thekoenproject/switching-networks-in-metamask-connecting-to-ethereum-mainnet-and-testnets-polygon-binance-smart-4d56b5af4923" target="_blank">
                Switching Networks on Metamask
            </a></li>
        </ul>
    </div>);
}


export default function Modal({ isOpen, setIsOpen, full_details }: ModalProps) {
    let completeButtonRef = useRef(null);
    return (
        <Transition appear show={isOpen} as={Fragment}>

            <Dialog
                onClose={() => setIsOpen(false)}
                as="div"
                className="fixed inset-0 z-50 flex overflow-y-auto"
                initialFocus={completeButtonRef}
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
                        <div className="fixed flex justify-center mx-auto inset-x-0 w-full p-0 bottom-1/3 max-w-md overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <div className="flex flex-col p-10 justify-center">
                                <Dialog.Title className="text-gray-900 text-2xl">
                                    Help
                                </Dialog.Title>
                                <div className="text-left">
                                    {get_help_info(full_details)}
                                </div>
                                <div>
                                    <button
                                        className="btn-sec w-1/3 h-11 p-0"
                                        onClick={() => setIsOpen(false)}
                                        ref={completeButtonRef}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>


                </div>
            </Dialog>
        </Transition >
    )
}
