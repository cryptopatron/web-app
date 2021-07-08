
import { useState, useEffect } from 'react'
import StreamComponent from './stream'
import OneTimerComponent from './one-timer';
import ListboxComponent from '../../../../components/listbox'

import { OneTimePayment, Subscription } from "../../payment";
import { networks } from './payment_options'

import { handle_one_time_txn, handle_streaming_txn } from "./handle-txn";


export default function SupportPanelComponent({ creatorDetails }) {

    const [streamButtomActive, setStreamButtonActive] = useState(true);

    const [network, setNetwork] = useState(networks[0]);

    const [oneTimePaymentDetails,  setOneTimePaymentDetails] = useState({
        amount: 0,
        network: "Mumbai Polygon Testnet",
        to_address: "0x7675289Fbd414acAE84752Bd789483a44B2d1576",
        currency_name: "DAI"
    });

    const [subscriptionPaymentDetails, setSubscriptionPaymentDetails] = useState({
        amount_per_day: 0,
        frequency_type: 1, // 0 for weekly, 1 for monthly
        network: "",
        currency_name: "DAI",
        expiry: 0,
        to_address: ""
    });

    const [msg, setMsg] = useState();
    const [error, setError] = useState();
    const [status, setStatus] = useState({
        step: 0,
        percent: 0
    });

    function network_display_name_to_value(network) {
        console.log("Network Display name to value", network);
        if (network === "Mumbai Polygon Testnet") {
            return "mumbai"
        } else if (network === "Ropsten Testnet") {
            return "ropsten"
        } else {
            return "unknown"
        }
    }

    function get_to_address(creator_details, network_value) {
        if (network_value === "mumbai") {
            return creator_details.generatedMaticWalletPublicKey;
        } else if (network_value === "ropsten") {
            return creator_details.metaMaskWalletPublicKey;
        }
    }

    function get_full_one_time_details() {
        const network_value = network_display_name_to_value(network.value);
        const full_details : OneTimePayment = {
            ...oneTimePaymentDetails,
            network: network_value,
            to_address: get_to_address(creatorDetails, network_value)
        };
        return full_details;
    }

    // do not delete:
    function get_full_subccription_details() {
        const network_value = network_display_name_to_value(network.value)
        const full_details : Subscription = {
            ...subscriptionPaymentDetails,
            network: network_value,
            to_address: get_to_address(creatorDetails, network_value)
        };
        return full_details;
    }


    useEffect(() => {
        //pass
    }, [oneTimePaymentDetails, subscriptionPaymentDetails]);


    return (
        <div className="flex flex-col mt-4 shadow-float-900 bg-white rounded-md text-center justify-center" style={{ width: '21rem' }}>


            <div className="font-semibold my-5">
                Support me!
            </div>
            {/* Stream and one time */}
            <div className="grid grid-cols-2 gap-y-0 gap-2 w-10/12 mx-auto">

                <button className={(streamButtomActive) ? (" tab-active ") : (" tab-inactive ")} onClick={() => { setStreamButtonActive(true) }}>stream</button>
                <button className={(streamButtomActive) ? (" tab-inactive ") : (" tab-active ")} onClick={() => { setStreamButtonActive(false) }}> one-timer</button>
                <div className="bg-white rounded-md col-span-2 h-44 z-20 flex p-4 justify-center text-center shadow-float-800" >
                    {(streamButtomActive) ? (<StreamComponent addPayment={setSubscriptionPaymentDetails} />) : (<OneTimerComponent addPayment={setOneTimePaymentDetails} />)}
                </div>
            </div>


            <div className="w-10/12 mx-auto">
                {/* pay button */}
                {(streamButtomActive)?
                    (<div>
                        <button className="btn-main mt-4 w-full" onClick={() => {
                            handle_streaming_txn(setMsg, setError, setStatus, get_full_subccription_details(), creatorDetails)
                        }}>
                            <span>{"Start " + String(subscriptionPaymentDetails.currency_name) + " Subscription"}</span>
                        </button>
                    </div>) :
                    (<div>
                        <button className="btn-main mt-4 w-full" onClick={() => {
                            handle_one_time_txn(setMsg, setError, get_full_one_time_details(), creatorDetails)
                        }}>
                            <span>{"Send " + String(oneTimePaymentDetails.amount) + " " + oneTimePaymentDetails.currency_name + " Donation" }</span>
                        </button>
                    </div>)
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
        </div>
    )
}