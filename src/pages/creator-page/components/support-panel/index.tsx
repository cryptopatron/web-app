import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import * as PATHS from '../../../../constants/paths'
import React, { useState } from 'react'
import StreamComponent from './stream'
import OneTimerComponent from './one-timer'

export default function SupportPanelComponent({addPayment}) {

    let [streamButtomActive, setStreamButtonActive] = useState(true)

 
    return (
        <div className=" flex flex-col w-5/6 mt-4 shadow-float bg-white rounded-md text-center">

            <p className="font-semibold">
                Support me!
            </p>
            {/* Stream and one time */}
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => {setStreamButtonActive(true)}}>stream</button>
                <button onClick={() => {setStreamButtonActive(false)}}> one-timer</button>
                
                {(streamButtomActive)?(<StreamComponent addPayment={addPayment}/>) : (<OneTimerComponent addPayment={addPayment}/>)}
                    

            </div>

            {/* message box */}

            {/* pay button */}
            
        </div>
    )

}