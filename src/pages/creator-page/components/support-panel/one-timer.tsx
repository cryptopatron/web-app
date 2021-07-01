import React, { useState } from 'react'


export default function OneTimerComponent({addPayment}) {

    const [amount, setAmount] = useState()

    const getAmount = (value) => {
        setAmount(value)
    }

    return (
        <div className="col-span-2 flex flex-col justify-center text-center shadow-float-800">
            <div className="font-light text-sm"> Make a one-time donation.</div>

            {/* Input field */}
            <div className="text-center">
                <button className=" px-3 py-2 text-gray-500 bg-graywhite-100 hover:text-gray-700 hover:bg-gray-200 focus:outline-none rounded-l-md">-</button>
                <input type="text" className="appearance-none px-3 text-center focus:outline-none py-2 bg-graywhite-100 w-3/5 mx-auto rounded-none"
                    value={amount}
                    onChange={(e) => getAmount(e.target.value)} />
                <button className=" px-3 py-2 text-gray-500 bg-graywhite-100 hover:bg-gray-200 hover:text-gray-700 focus:outline-none  rounded-r-md">+</button>
            </div>

            {/* per period */}
            <div className="flex flex-col justify-center">
                <div className="text-gray-400 text-sm">Have you heard of stream?</div>
                <div className="text-primary-light text-sm">Wanna know more?</div>

             
            </div>

            {/* check indefintely */}
            
        </div>
    )
}
