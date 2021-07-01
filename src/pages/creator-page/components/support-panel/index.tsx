import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import * as PATHS from '../../../../constants/paths'
import React, { useState, useEffect } from 'react'
import StreamComponent from './stream'
import OneTimerComponent from './one-timer'

export default function SupportPanelComponent({creatorDetails}) {

    const [streamButtomActive, setStreamButtonActive] = useState(true)
    const [paymentDetails, setPaymentDetails] = useState({
        amount:5
    })
    const [makePayment, setMakePayment] = useState()

    const addPayment = (value) => {
        console.log(value)
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


    return (
        <div className="flex flex-col w-5/6 mt-4 shadow-float-900 bg-white rounded-md text-center">

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
            <button className="btn-main">{(streamButtomActive)? 'stream' : 'send'} <span>{(paymentDetails.amount) ? paymentDetails.amount: "" }</span> </button>

        </div>
    )

}