import Web3 from "web3";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import contracts from './contracts.json'
import networks from './networks.json';

// Assumes user has supertokens, start streaming them
export async function Metamask_Mumbai_stream_fDAIx(setMsg, setError, paymentDetails) {
    const ethereum = (window as any).ethereum;
    const sf = new SuperfluidSDK.Framework({
        web3: new Web3(ethereum),
    });
    await sf.initialize()
    const walletAddress = await ethereum.request({
        method: 'eth_requestAccounts',
        params: [
            {
                eth_accounts: {}
            }
        ]
    });

    const usr = sf.user({
        address: walletAddress[0],
        token: contracts.fdaix_mumbai_address
    });

    await usr.flow({
        recipient: paymentDetails.wallet, // creator addresss
        flowRate: '10000'
    });
    setMsg("Starting Flow...")
}