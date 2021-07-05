import React from 'react'

export default function MainPanelComponent() {
    return (
        <div className="flex flex-col justify-center w-9/12 mx-auto">
            {/* total earnings */}
            <div className="flex flex-row m-2 shadow-float-900 bg-white rounded-md text-center justify-between">
                <div>total earnings</div>
                <div>..amount..</div>
            </div>
            {/* ongoing streams */}
            <div className="flex flex-row m-2 shadow-float-900 bg-white rounded-md text-center justify-between">
            <div>On-going streams</div>
            <div>..number..</div>
            </div>

            {/* Wallet */}
            <div className="flex flex-row m-2 shadow-float-900 bg-white rounded-md text-center justify-between">
            <div>Wallets</div>
            <div>..type...</div>
            </div>
        </div>
    )
}
