
import { useState, useEffect } from 'react'
import ListboxComponent from '../../../../components/listbox';
import { tokens, n_month_names } from './payment_options';
const minimum = 5 //minimum amount in stream


export default function StreamComponent({ addPayment, tokens, network, setIsOpen }) {

    const [amount, setAmount] = useState(5);
    const [currency, setCurrency] = useState(tokens[0]);
    const [nMonths, setNMonths] = useState(n_month_names[0]);

    const getAmount = (value) => {

        if (value) {
            const num = parseFloat(value)
            if (num >= minimum) {
                setAmount(num)
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

    // returns an array of unixes when the
    // subscription payments go through
    function get_payment_schedule(month_string) {
        let schedule: number[] = [];
        const months_to_expiry = get_n_months(month_string);
        const today = new Date();
        for (let i = 0; i < months_to_expiry; i++) {
            const pay_date = new Date(
                today.getFullYear() + Math.floor(i / 12),
                today.getMonth() + i % 12,
                today.getDate()
            )
            schedule.push(Math.floor((pay_date.getTime()) / 1000))
        }
        return schedule
    }


    function get_n_months(month_string) {
        return parseInt(month_string.split(" ")[0])
    }


    useEffect(() => {
        const subscription = {
            amount_per: amount,
            currency_name: currency.value,
            payment_schedule: get_payment_schedule(nMonths.value)
        }
        addPayment(subscription)
    }, [amount, nMonths, currency])

    return (
        <div className="flex flex-col justify-center text-center">
            <div className="font-light text-xs my-1">Support with monthly donations</div>

            {/* Input Amount/Currency */}
            <div className="flex flex-row justify-center items-center h-8 my-2">
                <div className="mx-1">
                    <button className=" px-3 py-1 text-gray-500 bg-graywhite-100 hover:text-gray-700 hover:bg-gray-200 focus:outline-none rounded-l-md" onClick={() => { decrementAmount() }}>-</button>
                    <input type="text" className=" px-3 py-1 w-20 text-center focus:outline-none bg-graywhite-100 mx-auto"
                        value={amount}
                        onChange={(e) => getAmount(e.target.value)} />
                    <button className="  px-3 py-1 text-gray-500 bg-graywhite-100 hover:bg-gray-200 hover:text-gray-700 focus:outline-none  rounded-r-md" onClick={() => { incrementAmount() }}>+</button>
                </div>

                <div className="z-40" style={{ width: '4.5rem' }}>
                    <ListboxComponent content={currency} setContent={setCurrency} ListboxContent={tokens} />
                </div>
            </div>

            {/* Input Length of Subscription */}
            <div className="flex flex-row justify-center items-center my-4">
                <div className="text-md mx-1">for</div>

                <div className="w-24 h-8 mx-2 ">
                    <ListboxComponent content={nMonths} setContent={setNMonths} ListboxContent={n_month_names} />
                </div>
            </div>

            {/* Help */}
            <div className="flex flex-col justify-center mt-0">
                {/*<div className="text-gray-400 text-xs font-light">Have you heard of stream?</div>*/}
                <div>
                    <button onClick={() => {setIsOpen(true)}}>
                        <div className="text-primary-light text-sm font-light">Help</div>
                    </button>

                </div>
            </div>
            
        </div>
    )
}
