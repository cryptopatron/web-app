import Web3 from "web3";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import contracts from './contracts.json'
import networks from './networks.json';

// Assumes user has supertokens, start streaming them
export async function Metamask_Mumbai_stream_fDAIx(setMsg, setError) {
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
        recipient: '0x31470a0A76593D7b1FeF56D8093D8a6E660Ca102', // Anish's address
        flowRate: '10000'
    });
    setMsg("Starting Flow...")
}