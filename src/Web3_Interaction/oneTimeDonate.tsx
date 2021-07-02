import React from 'react';
import { Metamask_connect_and_execute } from "./walletConnect";
import contracts from './contracts.json';

// executes one time donation through Metamask.
export async function Metamask_Mumbai_Donation(setMsg, setErr, params) {
    const network = {
        "expected_network_type": "private",
        "wrong_network_error": "[Switch to the Matic Mumbai Testnet]",
    }
    params["default_gas_amount"] = "1000000";
    params["default_gas_price"] = "20000000000";
    Metamask_connect_and_execute(setMsg, setErr, network, donate, params);
}

export async function Metamask_Ropsten_Donation(setMsg, setErr, params) {
    const network = {
        "expected_network_type": "ropsten",
        "wrong_network_error": "[Switch to the Ethereum Ropsten Testnet]"
    };
    params["default_gas_amount"] = "1000000";
    params["default_gas_price"] = "20000000000";
    Metamask_connect_and_execute(setMsg, setErr, network, donate, params);
}

// params = {
//     "recipient_name": "name",
//     "recipient_address": "0x...",
//     "donation_amount": "4000",
//     "payment_token_address": "0x...",
//     "default_gas_amount": "1000",
//     "default_gas_price": "2000",
//     }
// One time donation to recipient_address
async function donate(setMsg, setErr, web3Provider, accounts, params) {
    web3Provider.eth.defaultAccount = accounts[0];

    let payment_token = new web3Provider.eth.Contract(
        contracts["erc20_abi"],
        params["payment_token_address"]
    );

    web3Provider.eth.getGasPrice()
        .then(function (gp) {
            if (typeof (gp) === typeof (100)) {
                params["default_gas_price"] = String(gp);
            }

            let not_called = true;
            payment_token.methods.transfer(params["recipient_address"], params["donation_amount"])
                .send({
                    from: accounts[0],
                    gasPrice: params["default_gas_price"], gas: params["default_gas_amount"]
                })
                .on('error', function (error) {
                    setErr("Failed to get permission to send donation");
                })
                .on('transactionHash', function (txn_hash) {
                    // TODO: properly show transaction hash
                    setMsg(txn_link_msg(txn_hash, params["network"], "Sending Donation..."));
                })
                .on('confirmation', function (confirmationNumber, receipt) {
                    if (confirmationNumber === 2 && (not_called)) {
                        not_called = false;
                        let msg = params["recipient_name"] + " has received your Donation!"
                        setMsg(<h6>{msg}</h6>)
                    }
                })
        }).catch((error) => {
            setErr("Failed to Connect to Metamask");
        });
}

function txn_link_msg(txn_hash: string, network: string, msg: string) {
    let link = "/";
    let link_msg = "";
    if (network === "ropsten") {
        link = "https://ropsten.etherscan.io/tx/" + txn_hash;
        link_msg = "View Transaction on Ropsten Testnet Block Explorer";
    }
    else if (network === "mumbai") {
        link = "https://mumbai.polygonscan.com/tx/" + txn_hash;
        link_msg = "View Transaction on Mumbai Testnet Block Explorer";
    }
    return (<div>
        <h6>{msg}</h6>
        <br></br>
        <br></br>
        <a href={link} target="_blank" rel="noopener noreferrer">
            <h6>{link_msg}</h6>
        </a>
    </div>);
}