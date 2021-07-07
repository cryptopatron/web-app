import Web3 from "web3";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import contracts from './contracts.json'
import networks from './networks.json';

// Assumes user has supertokens, start streaming them
export async function Metamask_Mumbai_stream_fDAIx(setMsg, setError, setStatus, paymentDetails) {
    const ethereum = (window as any).ethereum;
    const sf = new SuperfluidSDK.Framework({
        web3: new Web3(ethereum),
    });
    setStatus({percent: 80, step: 2});
    await sf.initialize();
    const walletAddress = await ethereum.request({
        method: 'eth_requestAccounts',
        params: [
            {
                eth_accounts: {}
            }
        ]
    });
    setMsg("Sending Txn to Start Flow...");

    const usr = sf.user({
        address: walletAddress[0],
        token: contracts.fdaix_mumbai_address
    });
    console.log(paymentDetails.wallet);
    await usr.flow({
        recipient: paymentDetails.wallet, // creator address
        flowRate: '10'
    });


    setStatus({percent: 100, step: 3});
    setMsg("Flow Started!");
}