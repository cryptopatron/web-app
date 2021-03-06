import { useState, useEffect } from 'react'
import ListboxComponent from '../../../../components/listbox'

const minimum = 3; // minimum amount in one-time

export default function OneTimerComponent({ addPayment, tokens, network, setIsOpen }) {

    const [amount, setAmount] = useState<number>(5)
    const [currency, setCurrency] = useState(tokens[0])

    const getAmount = (value) => {
        if (value) {
            const num = parseFloat(value)
            if (num >= minimum) {
                setAmount(num);
            }
            else {
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

    useEffect(() => {
        const payment = {
            amount: amount,
            currency_name: currency.value
        }
        addPayment(payment)
    }, [amount, currency])

    return (
        <div className="flex flex-col justify-center items-center text-center w-full">
            <div className="font-light text-xs mt-8 mb-1"> Make a one-time donation</div>

            {/* Input field*/}
            <div className="flex flex-row justify-center h-8 my-2">
                <div className="mx-1">
                    <button className=" px-3 py-1 text-gray-500 bg-graywhite-100 hover:text-gray-700 hover:bg-gray-200 focus:outline-none rounded-l-md" onClick={() => { decrementAmount() }}>-</button>
                    <input type="text" className=" px-3 py-1 h-8 w-20 text-center focus:outline-none bg-graywhite-100 mx-auto"
                        value={amount}
                        onChange={(e) => getAmount(e.target.value)} />
                    <button className="  px-3 py-1 text-gray-500 bg-graywhite-100 hover:bg-gray-200 hover:text-gray-700 focus:outline-none  rounded-r-md" onClick={() => { incrementAmount() }}>+</button>
                </div>

                <div className="w-20">
                    <ListboxComponent content={currency} setContent={setCurrency} ListboxContent={tokens} />
                </div>
            </div>

            {/* Help */}
            <div className="flex mt-1 flex-grow items-end self-stretch justify-center">
                {/*<div className="text-gray-400 text-xs font-light">Have you heard of stream?</div>*/}
                <button onClick={() => setIsOpen(true)}>
                    <div className="text-primary-light text-sm font-light">Help</div>
                </button>

            </div>

        </div>
    )
}
