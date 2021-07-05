import { useState } from "react"

export default function MainPanelComponent({transaction, user}) {
    
    const [totalEarning, setTotalEarnings] = useState()

    const totalEarnings = () => {



    }
    return (

        <div className="flex flex-col justify-center w-9/12 max-w-lg mx-auto">
            {/* total earnings */}
            <div className="flex flex-row m-2 px-2 py-3 shadow-float-900 bg-white rounded-md text-center justify-between">
                <div>total earnings</div>
                <div>..amount..</div>
            </div>
            {/* ongoing streams */}
            <div className="flex flex-row m-2 px-2 py-3 shadow-float-900 bg-white rounded-md text-center justify-between">
            <div>On-going streams</div>
            <div>..number..</div>
            </div>

            {/* Wallet */}
            <div className="flex flex-row m-2 px-2 py-3 shadow-float-900 bg-white rounded-md text-center justify-between">
            <div className="">Wallet</div>
            <div>{(user.generatedMaticWalletPublicKey)?(user.generatedMaticWalletPublicKey) : (user.metaMaskWalletPublicKey)}</div>
            </div>
        </div>
    )
}
