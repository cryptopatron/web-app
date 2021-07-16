
import { useState, useEffect } from 'react'
import StreamComponent from './stream'
import OneTimerComponent from './one-timer';
import ListboxComponent from '../../../../components/listbox';
import { tokens, networks } from './payment_options';

import { OneTimePayment, Subscription } from "../../payment";

import { handle_one_time_txn, handle_streaming_txn, handle_mint_txn } from "./handle-txn";


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
        amount_per: 0,
        network: "",
        currency_name: "DAI",
        payment_schedule: [],
        to_address: ""
    });

    const [msg, setMsg] = useState();
    const [error, setError] = useState();

    function network_display_name_to_value(network) {
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

    function get_full_subscription_details() {
        const network_value = network_display_name_to_value(network.value);
        const full_details : Subscription = {
            ...subscriptionPaymentDetails,
            network: network_value,
            to_address: get_to_address(creatorDetails, network_value)
        };
        return full_details;
    }

    // returns true if the user has selected a testnet network, and false if not
    function isTestnet() {
        const network_value = network_display_name_to_value(network.value);
        return ((network_value === "ropsten") || (network_value === "mumbai"));
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
                    {(streamButtomActive) ?
                        (<StreamComponent
                            addPayment={setSubscriptionPaymentDetails}
                            tokens={tokens[network_display_name_to_value(network.value)]}
                        />) :
                        (<OneTimerComponent
                            addPayment={setOneTimePaymentDetails}
                            tokens={tokens[network_display_name_to_value(network.value)]}
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
        </div>
    )
}