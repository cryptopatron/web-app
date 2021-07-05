import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import * as PATHS from '../../../../constants/paths'
import React, { useState, useEffect } from 'react'
import StreamComponent from './stream'
import OneTimerComponent from './one-timer';
import { handle_txn } from "./handle-txn";
import {stepprogressbar} from "./progress_bar";

import { Metamask_Mumbai_mint_fDAI,
    Metamask_Mumbai_approve_fDAI,
    Metamask_Mumbai_upgrade_fdai } from "../../../../Web3_Interaction/streamDonate";
import { Metamask_Mumbai_stream_fDAIx } from "../../../../Web3_Interaction/superfluid_streaming";

export default function SupportPanelComponent({creatorDetails}) {

    const [streamButtomActive, setStreamButtonActive] = useState(true);
    const [paymentDetails, setPaymentDetails] = useState({
        amount:5
    });

    const [msg, setMsg] = useState();
    const [error, setError] = useState();
    const [status, setStatus] = useState({
        step: 0,
        percent: 0
    });

    const [makePayment, setMakePayment] = useState()

    const addPayment = (value) => {
        console.log(value);
        setPaymentDetails(value)
    }

    // this is logging the data you'll probably need
    useEffect(() => {
        console.log("creatorDetails >")
        console.log(creatorDetails)
        console.log("paymentDetails")
        console.log(paymentDetails)
    }, [paymentDetails])

    ///---------------------------------

    function getStreamingButton() {
        switch (status.step) {
            case 0: {
                return (<button className="btn-main" onClick={() => {
                    Metamask_Mumbai_approve_fDAI(setMsg, setError, setStatus)
                }}>
                    Stream: Approve upgrading your fDAI
                </button>)
            }
            case 1: {
                return (<button className="btn-main" onClick={() => {
                    Metamask_Mumbai_upgrade_fdai(setMsg, setError, setStatus)
                }}>
                    Stream: Upgrade fDAI into fDAIx
                </button>)
            }
            case 2: {
                return (<button className="btn-main" onClick={() => {
                    Metamask_Mumbai_stream_fDAIx(setMsg, setError, setStatus)
                }}>
                    Stream: Start Streaming fDAI
                </button>);
            }
            case 3: {
                return (<h6>Reload to send another stream </h6>)
            }
            default: {
                return (<h6>-</h6>);
            }
        }
    }


    return (
        <div className="flex flex-col w-5/6 mt-4 shadow-float-900 bg-white rounded-md text-center justify-center">

            <p className="font-semibold">
                Support me!
            </p>
            {/* Stream and one time */}
            <div className="grid grid-cols-2 gap-3">

                <button className="shadow-float-800 bg-white rounded-md text-center mb-5" onClick={() => {setStreamButtonActive(true)}}>stream</button>
                <button className="shadow-float-800 bg-white rounded-md text-center mb-5" onClick={() => {setStreamButtonActive(false)}}> one-timer</button>
                
                {(streamButtomActive)?(<StreamComponent addPayment={addPayment}/>) : (<OneTimerComponent addPayment={addPayment}/>)}

            </div>

            {/* message box */}

            {/* pay button */}
            {(streamButtomActive)?(getStreamingButton()) : (<button className="btn-main" onClick={() => {
                handle_txn(setMsg, setError, setStatus, paymentDetails, creatorDetails)
            }}>
                {(streamButtomActive)? 'stream ' : 'send '}
                <span>{(paymentDetails.amount) ? paymentDetails.amount: "" }</span>
            </button>)}
            <div className="w-40 text-center">{stepprogressbar(status)}</div>
            {msg}
            <h6 style={{ color: "red" }}>{error}</h6>
            <br></br>
        </div>
    )
}