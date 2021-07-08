
import {useState, useEffect } from 'react'
import ListboxComponent from '../../../../components/listbox';
// import StreamForComponent from './stream-for';
import { interval } from './intervals';
import {Subscription} from "../../payment";
const minimum = 5 //minimum amount in stream

export default function StreamComponent({ addPayment }) {

    const [amount, setAmount] = useState(5)
    const [perSelected, setPerSelected] = useState(interval[1])
    const [isIndefinte, setIsIndefinte] = useState(true)
    const [forInterval, setForInterval] = useState<number>(4)
    

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

    const changeCheck = () => {
        { setIsIndefinte(!isIndefinte) }
    }

    useEffect( () => {
        const subscription = {
            amount_per_day: amount,
            frequency_type: 0, // 0 for weekly, 1 for monthly
            network: 'mumbai',
            currency_name: "USDC",
            expiry: 0
        }
        addPayment(subscription)
    },[amount, perSelected, isIndefinte, forInterval])

    return (
        <div className="flex flex-col justify-center text-center">
            <div className="font-light text-xs my-1">An effortless way to support long-term</div>

            {/* Input field */}
            <div className="my-2">
                <button className=" px-3 py-1 text-gray-500 bg-graywhite-100 rounded-l-md hover:text-gray-700 hover:bg-gray-200 focus:outline-none " onClick={() => { decrementAmount() }}>-</button>
                <input type="text" className="px-3 py-1 w-3/5 appearance-none  text-center bg-graywhite-100  mx-auto rounded-none focus:outline-none"
                    value={amount}
                    onChange={(e) => getAmount(e.target.value)} />
                <button className=" px-3 py-1 text-gray-500 bg-graywhite-100 hover:bg-gray-200 hover:text-gray-700 focus:outline-none  rounded-r-md" onClick={() => { incrementAmount() }}>+</button>
            </div>

            {/* per period */}
            <div className="flex flex-row justify-center items-center my-4">
                <div className="text-sm mx-3">per</div>

                <div className="w-24 h-8 mx-3 ">
                    <ListboxComponent content={perSelected} setContent={setPerSelected} ListboxContent={interval}/>
                </div>
            </div>

            {/* check indefintely */}
            {/* <div>
                {(isIndefinte) ? (
                    <div>
                        <FontAwesomeIcon icon={faCheckSquare} onClick={() => changeCheck()} className="text-primary-light w-1 mr-3" />
                        <span className="text-xs">stream indefinitely</span>
                    </div>) : (
                    <div>
                        <StreamForComponent interval={perSelected} forInterval={forInterval} setForInterval={setForInterval} />
                        <FontAwesomeIcon icon={faSquare} onClick={() => changeCheck()} className="text-gray-300 w-1 mr-3" />
                        <span className="text-gray-300 text-xs">stream indefinitely</span>
                    </div>
                )
                }
            </div> */}
        </div>
    )
}
