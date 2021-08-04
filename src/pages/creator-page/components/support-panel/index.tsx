
import { useState, useEffect } from 'react'
import StreamComponent from './stream'
import OneTimerComponent from './one-timer';
import ListboxComponent from '../../../../components/listbox';
import Modal from '../../../../components/modal';
import { tokens, networks } from './payment_options';

import { OneTimePayment, Subscription } from "../../payment";

import { handle_one_time_txn, handle_streaming_txn, handle_mint_txn } from "./handle-txn";


export default function SupportPanelComponent({ creatorDetails }) {

    const [streamButtomActive, setStreamButtonActive] = useState(false);

    const [network, setNetwork] = useState(networks[0]);

    const [oneTimePaymentDetails,  setOneTimePaymentDetails] = useState({
        amount: 0,
        network: "Mumbai Polygon Testnet",
        to_address: "0x7675289Fbd414acAE84752Bd789483a44B2d1576",
        currency_name: "DAI"
    });

    const [subscriptionPaymentDetails, setSubscriptionPaymentDetails] = useState({
        amount_per: 0,
        network: "",
        currency_name: "DAI",
        payment_schedule: [],
        to_address: ""
    });

    const [msg, setMsg] = useState();
    const [error, setError] = useState();
    // to show or hide Modal
    const [isOpen, setIsOpen] = useState(false);


    function get_to_address(creator_details, network_value) {
        if (network_value === "mumbai") {
            return creator_details.generatedMaticWalletPublicAddress;
        } else {
            return creator_details.metaMaskWalletPublicAddress;
        }
    }

    function get_full_one_time_details() {
        const full_details : OneTimePayment = {
            ...oneTimePaymentDetails,
            network: network.id,
            to_address: get_to_address(creatorDetails, network.id)
        };
        return full_details;
    }

    function get_full_subscription_details() {
        const full_details : Subscription = {
            ...subscriptionPaymentDetails,
            network: network.id,
            to_address: get_to_address(creatorDetails, network.id)
        };
        return full_details;
    }

    // returns true if the user has selected a testnet network, and false if not
    function isTestnet() {
        return ((network.id === "ropsten") || (network.id === "mumbai"));
    }

    useEffect(() => {
        //pass
    }, [oneTimePaymentDetails, subscriptionPaymentDetails]);


    // @ts-ignore
    return (
        <div className="flex flex-col mt-4 shadow-float-900 bg-white rounded-md text-center" style={{ width: '21rem' }}>


            <div className="font-semibold my-5">
                Support me!
            </div>
            {/* Stream and one time */}
            <div className="grid grid-cols-2 gap-y-0 gap-2 w-10/12 mx-auto">

                <button className={(streamButtomActive) ? (" tab-active ") : (" tab-inactive ")} onClick={() => { setStreamButtonActive(true) }}>stream</button>
                <button className={(streamButtomActive) ? (" tab-inactive ") : (" tab-active ")} onClick={() => { setStreamButtonActive(false) }}> one-timer</button>
                <div className="bg-white rounded-md col-span-2 h-44 z-20 flex p-4 justify-center text-center shadow-float-800" >
                    {(streamButtomActive) ?
                        (<StreamComponent
                            addPayment={setSubscriptionPaymentDetails}
                            tokens={tokens[network.id]}
                            network={network}
                            setIsOpen={setIsOpen}
                        />) :
                        (<OneTimerComponent
                            addPayment={setOneTimePaymentDetails}
                            tokens={tokens[network.id]}
                            network={network}
                            setIsOpen={setIsOpen}
                        />)}
                </div>
            </div>


            <div className="w-10/12 mx-auto">
                {/* pay button */}
                {(streamButtomActive)?
                    (<div>
                        <button className="btn-main mt-4 w-full" onClick={() => {
                            handle_streaming_txn(setMsg, setError, get_full_subscription_details(), creatorDetails)
                        }}>
                            <span>{"Stream " + String(subscriptionPaymentDetails.amount_per) + " " + String(subscriptionPaymentDetails.currency_name)}</span>
                        </button>
                    </div>) :
                    (<div>
                        <button className="btn-main mt-4 w-full" onClick={() => {
                            handle_one_time_txn(setMsg, setError, get_full_one_time_details(), creatorDetails)
                        }}>
                            <span>{"Send " + String(oneTimePaymentDetails.amount) + " " + oneTimePaymentDetails.currency_name }</span>
                        </button>
                    </div>)
                }
                {/* mint button */}
                {(isTestnet())?(
                    (streamButtomActive)?
                    (<div>
                        <button className="btn-main mt-4 w-full" onClick={() => {
                            handle_mint_txn(setMsg, setError, get_full_subscription_details())
                        }}>
                            <span>{"Mint " + String(subscriptionPaymentDetails.currency_name)}</span>
                        </button>
                    </div>) :
                    (<div>
                        <button className="btn-main mt-4 w-full" onClick={() => {
                            handle_mint_txn(setMsg, setError, get_full_one_time_details())
                        }}>
                            <span>{"Mint " + String(oneTimePaymentDetails.currency_name)}</span>
                        </button>
                    </div>)) :
                    (<div></div>)
                }
                {/* select network */}
                <div className="flex flex-col justify-center mt-3">
                    <ListboxComponent content={network} setContent={setNetwork} ListboxContent={networks} />
                </div>
                {/* Messages: */}
                <br></br>
                {msg}
                <h6 style={{ color: "red" }}>{error}</h6>
                <br></br>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} full_details={{
                network: network
            }} />
        </div>
    )
}