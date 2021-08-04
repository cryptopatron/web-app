import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function PopoverComponent({
    popoverButton,
    popoverContent
}) {
    return (
        <div className="w-full">
            <Popover className="relative">
                {({ open }) => (
                    <>
                        <Popover.Button
                        >
                            <div>{popoverButton}</div>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-10 mt-3 transform">
                                <div className="overflow-hidden rounded-md shadow-float-900">
                                    {popoverContent}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}

