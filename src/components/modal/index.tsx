import * as React from "react"
import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import {useRef} from "react";

type ModalProps = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    full_details: any
}

function get_help_info(full_details) {
    switch (full_details.network.id ) {
        case "mumbai":
            return (<div>
                <a href="https://www.youtube.com/watch?v=FwrFa2_mVIE" target="_blank">
                    <p className="text-sm m-4">
                        How to switch to Mumbai Testnet on Metamask
                    </p>
                </a>
                <a href="https://faucet.matic.network/">
                    <p className="text-sm m-4">
                        How to get Matic to pay for transactions on Mumbai
                    </p>
                </a>
            </div>);
        case "ropsten":
            return (<div>
                <a href="https://docs.cargo.build/guides/changing-your-network-with-metamask" target="_blank">
                    <p className="text-sm m-4">
                        How to switch to Ropsten Testnet on Metamask
                    </p>
                </a>
                <a href="https://www.youtube.com/watch?v=1B-_CYl9kkg" target="_blank">
                    <p className="text-sm m-4">
                        How to get Ropsten Testnet ETH to pay for transactions on Ropsten
                    </p>
                </a>
            </div>);
        default:
            return (<div>
                <a href="https://docs.cargo.build/guides/changing-your-network-with-metamask" target="_blank">
                    <p className="text-sm m-4">
                        How to switch to Ethereum Mainnet on Metamask
                    </p>
                </a>
            </div>);
    }
}


export default function Modal({ isOpen, setIsOpen, full_details }: ModalProps) {
    let completeButtonRef = useRef(null);
    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            as="div"
            className={clsx(
                "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto",

            )}
            initialFocus={completeButtonRef}
        >
            <div className="flex flex-col bg-gray-800 text-white w-96 py-8 px-4 text-center rounded-md">
                <Dialog.Overlay />

                <Dialog.Title className="text-green-500 text-2xl">
                    Help
                </Dialog.Title>
                {/*<Dialog.Description className="text-xl m-2">*/}
                {/*    This will permanently deactivate your account*/}
                {/*</Dialog.Description>*/}

                { get_help_info(full_details) }
                <button
                    className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsOpen(false)}
                    ref={completeButtonRef}
                >
                    Close
                </button>
            </div>
        </Dialog>
    )
}
