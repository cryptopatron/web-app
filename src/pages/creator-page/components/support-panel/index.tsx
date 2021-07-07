
import { useState, useEffect } from 'react'
import StreamComponent from './stream'
import OneTimerComponent from './one-timer';
import { handle_txn } from "./handle-txn";
import {stepprogressbar} from "./progress_bar";

import { Metamask_Mumbai_mint_fDAI,
    Metamask_Mumbai_approve_fDAI,
    Metamask_Mumbai_upgrade_fdai
} from "../../../../Web3_Interaction/streamDonate";
import { Metamask_Mumbai_stream_fDAIx } from "../../../../Web3_Interaction/superfluid_streaming";

export default function SupportPanelComponent({ creatorDetails }) {

    const [streamButtomActive, setStreamButtonActive] = useState(true);
    const [paymentDetails, setPaymentDetails] = useState({
        amount: 5
    });

    const [msg, setMsg] = useState();
    const [error, setError] = useState();
    const [status, setStatus] = useState({
        step: 0,
        percent: 0
    });

    const addPayment = (value) => {
        if (creatorDetails.metaMaskWalletPublicKey) {
            setPaymentDetails({ ...value, name:creatorDetails.name, wallet:creatorDetails.metaMaskWalletPublicKey })
        }
        
        if (creatorDetails.generatedMaticWalletPublicKey) {
            setPaymentDetails({ ...value, name:creatorDetails.name, wallet:creatorDetails.generatedMaticWalletPublicKey })
        }
    }

    useEffect(() => {
        console.log("paymentDetails")
        console.log(paymentDetails)
    }, [paymentDetails])


    ///---------------------------------

    function getStreamingButton() {
        switch (status.step) {
            case 0: {
                return (<button className="btn-main m-5" onClick={() => {
                    Metamask_Mumbai_approve_fDAI(setMsg, setError, setStatus)
                }}>
                    Stream: Approve upgrading your fDAI
                </button>)
            }
            case 1: {
                return (<button className="btn-main m-5" onClick={() => {
                    Metamask_Mumbai_upgrade_fdai(setMsg, setError, setStatus)
                }}>
                    Stream: Upgrade fDAI into fDAIx
                </button>)
            }
            case 2: {
                return (<button className="btn-main m-5" onClick={() => {
                    Metamask_Mumbai_stream_fDAIx(setMsg, setError, setStatus, paymentDetails)
                }}>
                    Stream: Start Streaming fDAI
                </button>);
            }
            case 3: {
                return (<button className="btn-main m-5 hover:bg-gray-300 bg-gray-300 text-gray-400 hover:text-gray-400 pointer-events-none">
                    Stream: Txn to Stream fDAI sent
                </button>)
            }
            default: {
                return (<h6>-</h6>);
            }
        }
    }


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
                    {(streamButtomActive) ? (<StreamComponent addPayment={addPayment} />) : (<OneTimerComponent addPayment={addPayment} />)}
                </div>
            </div>

            {/* message box */}

            {/* pay button */}
            <div className="w-10/12 mx-auto">
                {(streamButtomActive)?(getStreamingButton()) : (<button className="btn-main mt-5 w-full" onClick={() => {
                handle_txn(setMsg, setError, setStatus, paymentDetails, creatorDetails)
            }}>
                {(streamButtomActive)? 'stream ' : 'send '}
                <span>{(paymentDetails.amount) ? paymentDetails.amount: "" }</span>
            </button>)}
                {(streamButtomActive)?
                    (<div className="w-40 text-center ml-14">{stepprogressbar(status)}</div>)
                    : (<div></div>)
                }
                <br></br>
            {msg}
            <h6 style={{ color: "red" }}>{error}</h6>
            <br></br>
            </div>
            
        </div>
    )
}