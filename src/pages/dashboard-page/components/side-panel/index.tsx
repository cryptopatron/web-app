import React from 'react'
import ImageWallet from './../../../../assets/images/wallet-svg.svg'
import ImageDefaultProfile1 from './../../../../assets/images/default_profile_1.svg'
import ImageMetamaskIcon from "./../../../../assets/images/metamask-icon.svg";
import { Link } from 'react-router-dom'
import PopoverComponent from '../../../../components/popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faBinoculars, faPen, faCopy } from '@fortawesome/free-solid-svg-icons';


const METAMASK = 'Metamask'
const GEN_WALLET = 'Kōen'

const displayLimitedText = (text: string): string => {

    if (text.length > 10) {
        return (text.substring(0, 5) + "..." + text.substring(text.length, text.length - 4))
    }
    return text
}


const wallet = (walletName: string, walletAddress: string) => {

    let walletImage

    if (walletName === METAMASK) {
        walletImage = ImageMetamaskIcon
    }
    else {
        walletImage = ImageWallet
    }
    return (

        <div className="flex flex-row items-center shadow-float-900 bg-white rounded-md py-3 pl-5 pr-4 hover:shadow-float-900-hover transition duration-150 ease-out ">

            <div>
                <img
                    className="inline-block w-7 mr-4"
                    src={walletImage}
                    alt="metamask"
                />
            </div>

            <div className="text-left">
                <div className=" text-sm font-medium">
                    {walletName}
                </div>
                <div className=" text-sm font-medium text-gray-500">
                    {displayLimitedText(walletAddress)}
                </div>
            </div>

            <div className="ml-3">
                <FontAwesomeIcon
                    icon={faCaretDown}
                />
            </div>

        </div>

    )
}

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
}

const redirectToScan = (walletAddress) => {
    window.location.href = `https://etherscan.io/address/${walletAddress}`
}

const walletPannel = (walletName: string, walletAddress: string) => {

    return (
        <div className="flex flex-col bg-white w-80 p-4 text-sm text-center">
            <div>
                <p className="mb-2">Your <span className="font-semibold">{walletName}</span> wallet is <span className="font-semibold">active</span></p>

            </div>
            <div className="flex flex-row justify-start mt-3">
                <input type="text" value={walletAddress} className=" w-full px-2 py-1 text-xs bg-graywhite-100 rounded-md focus:outline-none mr-2" />
                <button className="mx-1"> <div className="flex border w-8 h-8 rounded-full border-gray-900 items-center justify-center hover:bg-primary-hover"><FontAwesomeIcon className="flex text-xs"
                    icon={faPen}
                /></div> </button>

                <button className="mx-1" onClick={() => { copyToClipboard(walletAddress) }}> <div className="flex border w-8 h-8 rounded-full border-gray-900 items-center justify-center hover:bg-primary-hover"><FontAwesomeIcon className="flex text-xs"
                    icon={faCopy}
                /></div> </button>
                <button className="mx-1" onClick={() => { redirectToScan(walletAddress) }}> <div className="flex border w-8 h-8 rounded-full border-gray-900 items-center justify-center hover:bg-primary-hover"><FontAwesomeIcon className="flex text-xs"
                    icon={faBinoculars}
                /></div> </button>
            </div>
        </div>
    )

}


export default function SidePanelComponent({ creator }) {

    return (
        <div className="mx-6">

            {/* pictture and name */}
            <div>
                <Link to={`/${creator.pageName}`}>
                    <div className=" flex mx-auto mt-8 justify-center w-32 h-32 rounded-full bg-primary-hover">
                        <img className="w-2/5 transform translate-y-3" src={ImageDefaultProfile1} alt="profile" />
                    </div>
                    <div className="text-center">
                        <p className="text-md my-4 font-medium">{creator.name}</p>
                    </div>
                </Link>
            </div>

            {/* supporters count */}
            <div className="my-10">
                {(creator.metaMaskWalletPublicKey) ? (
                    <PopoverComponent popoverButton={wallet(METAMASK, creator.metaMaskWalletPublicKey)} popoverContent={walletPannel(METAMASK, creator.metaMaskWalletPublicKey)} />
                ) : (
                    <PopoverComponent popoverButton={wallet(GEN_WALLET, creator.generatedMaticWalletPublicKey)} popoverContent={walletPannel(GEN_WALLET, creator.generatedMaticWalletPublicKey)} />
                )}
            </div>


        </div>
    )
}
