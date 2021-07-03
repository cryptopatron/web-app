import React, { useState, useEffect } from 'react'

const minimum = 3 //minimum amount in one-time

export default function OneTimerComponent({addPayment}) {

    const [amount, setAmount] = useState<number>(3)

    const getAmount = (value) => {
        
        if (value) {
            const num = parseFloat(value)
            if (num >= minimum) {
                setAmount(num)
            }
            else{
                setAmount(minimum) 
            }
        }
        else {
            setAmount(minimum)
        }
    }

    const incrementAmount = () => {
        const value = amount + 1
        setAmount(value)
    }

    const decrementAmount = () => {

        const value = amount > minimum ? amount - 1 : minimum
        setAmount(value)
    }

    useEffect( () => {
        addPayment({amount: amount, network: 'mumbai', isStreamIndefinite: null, type:2, streamPer: null, streamFor: null})
    },[amount])


    return (
        <div className="p-4 z-20 bg-white col-span-2 flex flex-col justify-center rounded-b-md rounded-tl-md shadow-float-800 text-center">
            <div className="font-light text-xs mb-3"> Make a one-time donation.</div>

            {/* Input field */}
            <div className="my-1">
                <button className=" px-3 py-1 text-gray-500 bg-graywhite-100 hover:text-gray-700 hover:bg-gray-200 focus:outline-none rounded-l-md" onClick={() => { decrementAmount() }}>-</button>
                <input type="text" className=" px-3 py-1 w-3/5 text-center focus:outline-none bg-graywhite-100 mx-auto"
                    value={amount}
                    onChange={(e) => getAmount(e.target.value)} />
                <button className="  px-3 py-1 text-gray-500 bg-graywhite-100 hover:bg-gray-200 hover:text-gray-700 focus:outline-none  rounded-r-md" onClick={() => { incrementAmount() }}>+</button>
            </div>

            {/* per period */}
            <div className="flex flex-col justify-center">
                <div className="text-gray-400 text-sm">Have you heard of stream?</div>
                {/*TODO: Update Link below*/}
                <a href="/"><div className="text-primary-light text-sm">Wanna know more?</div></a>
            </div>

            {/* check indefintely */}
            
        </div>
    )
}
