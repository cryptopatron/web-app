
import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import StreamForComponent from './stream-for';

const interval = [
    { per: 'week' },
    { per: 'month' },
    { per: 'year' }

]

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

    useEffect(() => {
        addPayment({ amount: amount, network: 'ropsten', isStreamIndefinite: isIndefinte, type: 1, streamPer: perSelected.per, streamFor: (!isIndefinte) ? forInterval : 0 })
    }, [amount, perSelected, isIndefinte, forInterval])

    return (
        <div className="col-span-2 flex flex-col justify-center text-center shadow-float-800">
            <div className="font-light text-sm">An effortless way to support in the long run</div>

            {/* Input field */}
            <div className="text-center">
                <button className=" px-3 py-2 text-gray-500 bg-graywhite-100 hover:text-gray-700 hover:bg-gray-200 focus:outline-none rounded-l-md" onClick={() => { decrementAmount() }}>-</button>
                <input type="text" className="appearance-none px-3 text-center focus:outline-none py-2 bg-graywhite-100 w-3/5 mx-auto rounded-none"
                    value={amount}
                    onChange={(e) => getAmount(e.target.value)} />
                <button className=" px-3 py-2 text-gray-500 bg-graywhite-100 hover:bg-gray-200 hover:text-gray-700 focus:outline-none  rounded-r-md" onClick={() => { incrementAmount() }}>+</button>
            </div>

            {/* per period */}
            <div className="flex flex-row justify-center">
                <div className="">per</div>

                <div className="w-28">
                    <Listbox value={perSelected} onChange={setPerSelected}>
                        <div className="relative">
                            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{perSelected.per}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <FontAwesomeIcon
                                        icon={faCaretDown}
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {interval.map((person, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                                `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                            }
                                            value={person}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`${selected ? 'font-medium' : 'font-normal'
                                                            } block truncate`}
                                                    >
                                                        {person.per}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                        >
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>

            {/* check indefintely */}
            <div>
                {(isIndefinte) ? (
                    <div>
                        <FontAwesomeIcon icon={faCheckSquare} onClick={() => changeCheck()} className="text-primary-light w-1 mr-3" />
                        <span className="text-sm">stream indefintely</span>
                    </div>) : (
                    <div>
                        <StreamForComponent interval={perSelected} forInterval={forInterval} setForInterval={setForInterval} />
                        <FontAwesomeIcon icon={faSquare} onClick={() => changeCheck()} className="text-gray-300 w-1 mr-3" />
                        <span className="text-gray-300 text-sm">stream indefinitely</span>
                    </div>

                )
                }
            </div>
        </div>
    )
}
