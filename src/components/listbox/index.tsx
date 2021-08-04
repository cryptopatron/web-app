import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ListboxComponent({ content, setContent, ListboxContent }) {

    return (
        <Listbox value={content} onChange={setContent}>
            <div className="relative h-8 w-full">
                <Listbox.Button className="relative w-full h-full pl-1 pr-4 text-left bg-graywhite-100 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate ml-2">{content.value}</span>
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
                        {ListboxContent.map((item, itemIndex) => (
                            <Listbox.Option
                                key={itemIndex}
                                className={({ active }) =>
                                    `${active ? 'text-gray-900 bg-primary-hover' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-7 pr-2`
                                }
                                value={item}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className='font-normal block truncate'
                                        >
                                            {item.value}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`${active ? 'text-amber-600' : 'text-amber-600'
                                                    }
                                absolute inset-y-0 left-0 flex items-center pl-2`}
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
    )
}
